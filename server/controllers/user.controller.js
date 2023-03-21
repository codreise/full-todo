const { User, RefreshToken } = require("../models");
const bcrypt = require('bcrypt');
const NotFoundError = require('../errors/NotFound');
const {createAccessToken, verifyAccessToken, createRefreshToken, verifyRefreshToken} = require("../services/tokenService");
const RefreshTokenError = require("../errors/RefreshTokenError");

module.exports.registrationUser = async(req, res, next) => {
    try {
        const {body, passwordHash} = req;
        const createdUser = await User.create({...body, passwordHash});
        const token = await createAccessToken({userId: createdUser._id, email: createdUser.email});
        res.status(200).send({data: createdUser, tokens: {token}});
    } catch (error) {
        next(error);
    }
}

module.exports.loginUser = async(req, res, next) => {
    try {
        const { body } = req;
        const foundUser = await User.findOne({
            email: body.email
        });
        if(foundUser) {
            const result = await bcrypt.compare(body.password, foundUser.passwordHash);
            if(!result) {
                throw new NotFoundError('Incorrect password');
            }
            const accessToken = await createAccessToken({userId: foundUser._id, email: foundUser.email});
            const refreshToken = await createRefreshToken({userId: foundUser._id, email: foundUser.email});
            
            const addedToken = await RefreshToken.create({
                token: refreshToken,
                userId: foundUser._id
                // TODO: check if creating succesfull
                // TODO: check, how much tokesns is already use
            })
            
            res.status(200).send({data: foundUser, tokens: {accessToken, refreshToken}})
        } else {
            throw new NotFoundError('Incorrect email');
        }
    } catch (error) {
        next(error);
    }
}

module.exports.checkAuth = async(req, res, next) => {
    try {
        const {tokenPayload: {email}} = req;

        const foundUser = await User.findOne({
            email: email
        });
        res.status(200).send({data: foundUser});
    } catch (error) {
        next(error);
    }
}

module.exports.refreshSession = async (req, res, next) => {
    /*
    Access Token - живе мало, багаторазовий, саме з ним ми робимо всі запити
    Refresh Token - живе довго, але він одноразовий
    Приходить запит з аксесс-токеном (АТ)
        - АТ валідний, працюємо
        - АТ невалідний (прострочився)
            1. Відповідаємо певним кодом помилки
            2. У відповідь на цю помилку, фронт надсилає РТ.
                - якщо цей Р-токен - валідний, то ми "рефрешимо" всю сесію - видаємо нову пару токенів
                - якщо РТ невалідний, то направляємо користувача на авторизацію
    */

    const {body: {refreshToken}} = req;
    let verifyResult;
    try {
        verifyResult = await verifyRefreshToken(refreshToken);
    } catch (error) {
        const newError = new RefreshTokenError('Invalid refresh token');
        return next(newError); 
    }
    try {
        if(verifyResult) {
            const foundUser = await User.findOne({email: verifyResult.email});
            const rTFromDB = await RefreshToken.findOne({$and: [{token: refreshToken}, {userId: foundUser._id}]});
            if(rTFromDB) {
                // const removeResult = await rTFromDB.remove(); <<--- REMOVED METHOD FROM MONGOOSE
                const removeResult = await RefreshToken.deleteOne({$and: [{token: refreshToken}, {userId: foundUser._id}]});
                const newAccessToken = await createAccessToken({userId: foundUser._id, email: foundUser.email});
                const newRefreshToken = await createRefreshToken({userId: foundUser._id, email: foundUser.email});
                const addedToken = await RefreshToken.create({
                    token: newRefreshToken,
                    userId: foundUser._id
                })
                res.status(200).send({tokens: {
                    accessToken: newAccessToken,
                    refreshToken: newRefreshToken
                }})
            }
        } else {
            res.status(401).send({error: 'Invalid token'});
        } 
    } catch(error) {
        next(error);
    }
}
const {promisify} = require('util');
const jwt = require('jsonwebtoken');
const {REFRESH_SECRET, ACCESS_SECRET, REFRESH_EXPIRES_TIME, ACCESS_EXPIRES_TIME} = require('../configs/constants'); 

const promisifyJWTSign = promisify(jwt.sign);
const promisifyJWTVerify = promisify(jwt.verify);

module.exports.createAccessToken = async ({userId, email}) => 
        await promisifyJWTSign({userId, email}, ACCESS_SECRET, {
                expiresIn: ACCESS_EXPIRES_TIME
        });

module.exports.verifyAccessToken = async (token) => await promisifyJWTVerify(token, ACCESS_SECRET);

module.exports.createRefreshToken = async ({userId, email}) => 
        await promisifyJWTSign({userId, email}, REFRESH_SECRET, {
                expiresIn: REFRESH_EXPIRES_TIME
        });

module.exports.verifyRefreshToken = async (token) => await promisifyJWTVerify(token, REFRESH_SECRET);
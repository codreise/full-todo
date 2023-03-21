class RefreshTokenError extends Error {
    constructor(message) {
        super(message);
    }
}

module.exports = RefreshTokenError;
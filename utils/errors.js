class AppError extends Error {
    constructor(message, cause) {
        super(message);
        this.cause = cause;
        this.name = this.constructor.name;
    }
}

class ValidationError extends Error {
    constructor(message) {
        super(message);
        this.name = this.constructor.name;
    }
}

class ParameterRequiredError extends ValidationError {
    constructor(paramName) {
        super(`${paramName} is blank or omitted`);
        this.name = this.constructor.name;
        this.paramName = paramName;
    }
}


class AuthorizationError extends Error {
    constructor(message) {
        super(message);
        this.name = this.constructor.name;
    }
}

module.exports = {
    'AppError': AppError,
    'ValidationError': ValidationError,
    'ParameterRequiredError': ParameterRequiredError,
    'AuthorizationError': AuthorizationError
};
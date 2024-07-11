class ApiError extends Error {
    constructor(
        statusCode,
        message = "Default message",
        errors = [],
        stackTrace = "",
    ) {
        super(message);
        this.statusCode = statusCode;
        this.data = null;   // read
        this.message = message;
        this.success = false;
        this.errors = errors

        if (stackTrace) {
            this.stack = stackTrace;
        } else {
            Error.captureStackTrace(this, this.constructor);
        }
    }
}

export default ApiError
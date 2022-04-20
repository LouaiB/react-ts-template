/**
 * @description custom HTTP errors
 */


class HttpError extends Error {
    originalError?: Error;
    constructor(message: string, originalError?: Error) {
        super(message);
        this.name = "HttpError";
        if(originalError) this.originalError = originalError;
    }
}

class UnauthorizedHttpError extends HttpError {
    constructor(message: string, originalError?: Error) {
        super(message, originalError);
        this.name = "UnauthorizedHttpError";
    }
}

class UnauthenticatedHttpError extends HttpError {
    constructor(message: string, originalError?: Error) {
        super(message, originalError);
        this.name = "UnauthenticatedHttpError";
    }
}

class RequestNotSentHttpError extends HttpError {
    constructor(message: string, originalError?: Error) {
        super(message, originalError);
        this.name = "RequestNotSentHttpError";
    }
}

class ResponseNotReceivedHttpError extends HttpError {
    constructor(message: string, originalError?: Error) {
        super(message, originalError);
        this.name = "ResponseNotReceivedHttpError";
    }
}

class HttpResponseError extends HttpError {
    status?: number;
    constructor(message: string, originalError?: Error, status?: number) {
        super(message, originalError);
        this.name = "HttpResponseError";
        if(status) this.status = status;
    }
}

class InternalServerHttpError extends HttpError {
    constructor(message: string, originalError?: Error) {
        super(message, originalError);
        this.name = "InternalServerHttpError";
    }
}


/**
 * Exports
 */
const HttpErrors = {
    HttpError,
    UnauthorizedHttpError,
    UnauthenticatedHttpError,
    RequestNotSentHttpError,
    ResponseNotReceivedHttpError,
    HttpResponseError,
    InternalServerHttpError
}
export default HttpErrors;
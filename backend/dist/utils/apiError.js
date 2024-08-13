"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class ApiError extends Error {
    constructor(statusCode, message, success = false) {
        super(message);
        this.message = message;
        this.statusCode = statusCode;
        this.stack = process.env.NODE_ENV === "development" ? this.stack : "";
        this.success = success;
    }
}
exports.default = ApiError;

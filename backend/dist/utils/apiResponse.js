"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class ApiResponse {
    // role:string;
    constructor(data, message, success = true, role) {
        this.data = data;
        this.message = message;
        this.success = success;
        // this.role=role;
    }
}
exports.default = ApiResponse;

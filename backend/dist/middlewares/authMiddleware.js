"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const apiError_1 = __importDefault(require("../utils/apiError"));
const asyncHandler_1 = __importDefault(require("../utils/asyncHandler"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const env_1 = __importDefault(require("../constant/env"));
const adminModel_1 = __importDefault(require("../models/adminModel"));
const authMiddleware = (0, asyncHandler_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const { accessToken } = req.cookies || ((_a = req.headers.authorization) === null || _a === void 0 ? void 0 : _a.split(" ")[1]);
    if (!accessToken) {
        return next(new apiError_1.default(401, "user unauthorized !"));
    }
    try {
        const decodedToken = (yield jsonwebtoken_1.default.verify(accessToken, env_1.default.get("ACCESS_TOKEN_SECRET")));
        const user = yield adminModel_1.default.findById(decodedToken === null || decodedToken === void 0 ? void 0 : decodedToken._id);
        if (!user) {
            return next(new apiError_1.default(401, "user unauthorized ! | user not found in db !"));
        }
        req.admin = user;
    }
    catch (error) {
        return next(new apiError_1.default(401, "Token was Expires please login again !"));
    }
    next();
}));
exports.default = authMiddleware;

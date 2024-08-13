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
const mongoose_1 = __importDefault(require("mongoose"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const env_1 = __importDefault(require("../constant/env"));
const adminSchema = new mongoose_1.default.Schema({
    name: {
        type: String,
    },
    email: {
        type: String,
        unique: true,
        required: true,
    },
    password: {
        type: String,
    },
    role: {
        type: String,
        required: true
    }
});
adminSchema.pre("save", function (next) {
    return __awaiter(this, void 0, void 0, function* () {
        if (this.isModified("password")) {
            //@ts-ignore
            this.password = yield bcrypt_1.default.hash(this.password, 10);
        }
        next();
    });
});
adminSchema.methods.passwordIsMatch = function (password) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield bcrypt_1.default.compare(password, this.password);
    });
};
adminSchema.methods.generateAccessToken = function () {
    return __awaiter(this, void 0, void 0, function* () {
        const playload = {
            _id: this._id,
            email: this.email,
        };
        const token = yield jsonwebtoken_1.default.sign(playload, env_1.default.get("ACCESS_TOKEN_SECRET"), {
            expiresIn: env_1.default.get("ACCESS_TOKEN_EXPIRY"),
        });
        return token;
    });
};
const Admin = mongoose_1.default.model("Admin", adminSchema);
exports.default = Admin;

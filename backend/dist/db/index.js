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
const env_1 = __importDefault(require("../constant/env"));
const mongoose_1 = __importDefault(require("mongoose"));
const connectDb = (uri) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { connection } = yield mongoose_1.default.connect(`${uri}/${env_1.default.get("DB_NAME")}`);
        console.log("MONGODB CONNECTED ON HOST :", connection.host);
    }
    catch (error) {
        console.log("MONGODB CONNECTION FAILED :", error);
    }
});
exports.default = connectDb;

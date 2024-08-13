"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const db_1 = __importDefault(require("./db"));
const app_1 = __importDefault(require("./app"));
const env_1 = __importDefault(require("./constant/env"));
const mongoUri = env_1.default.get("MONGO_URI");
const port = env_1.default.get("PORT") || 4000;
(0, db_1.default)(mongoUri)
    .then(() => {
    app_1.default.listen(port, () => {
        console.log("SERVER STARTED AT :", port);
    });
})
    .catch((error) => {
    console.log("MONGO DB CONNECTION FIALED :", error);
});

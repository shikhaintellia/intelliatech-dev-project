"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = require("dotenv");
(0, dotenv_1.config)({
    path: "./.env",
});
const ENV = process.env;
const ENVS = {
    get(key) {
        const value = ENV[key];
        if (!value) {
            throw new Error(`ENV IS MISSING ${value}`);
        }
        return value;
    },
};
exports.default = ENVS;

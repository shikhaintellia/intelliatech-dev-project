"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const adminControllers_1 = __importDefault(require("../controllers/adminControllers"));
const authMiddleware_1 = __importDefault(require("../middlewares/authMiddleware"));
const multerMiddleware_1 = __importDefault(require("../middlewares/multerMiddleware"));
const router = (0, express_1.Router)();
router.route("/signup").post(adminControllers_1.default.signup);
router.route("/signin").post(adminControllers_1.default.signin);
router.route("/create-developer").post(authMiddleware_1.default, multerMiddleware_1.default.fields([
    {
        name: "profile",
        maxCount: 1,
    },
    {
        name: "resume",
        maxCount: 1,
    },
]), adminControllers_1.default.createdDeveloper);
router.route("/update-developer/:devId").put(authMiddleware_1.default, multerMiddleware_1.default.fields([
    {
        name: "profile",
        maxCount: 1,
    },
    {
        name: "resume",
        maxCount: 1,
    },
]), adminControllers_1.default.updateDeveloperProfile);
exports.default = router;

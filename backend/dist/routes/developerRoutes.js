"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const developerControllers_1 = __importDefault(require("../controllers/developerControllers"));
const authMiddleware_1 = __importDefault(require("../middlewares/authMiddleware"));
const router = (0, express_1.Router)();
router.route("/").get(developerControllers_1.default.getBenchDeveloper);
router
    .route("/:devId")
    .patch(authMiddleware_1.default, developerControllers_1.default.changeBenchStatus);
exports.default = router;

"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const errorHandlerMiddlewares_1 = __importDefault(require("./middlewares/errorHandlerMiddlewares"));
const app = (0, express_1.default)();
app.use(express_1.default.json({ limit: "16kb" }));
app.use(express_1.default.urlencoded({ extended: true }));
app.use(
// TODO : set origin
(0, cors_1.default)({
    origin: "*",
    credentials: true,
}));
app.use((0, cookie_parser_1.default)());
app.get("/", (_, res) => {
    res.send("working fine");
});
const adminRoutes_1 = __importDefault(require("./routes/adminRoutes"));
const developerRoutes_1 = __importDefault(require("./routes/developerRoutes"));
app.use("/api/admin", adminRoutes_1.default);
app.use("/api/developers", developerRoutes_1.default);
// app.use();
app.use(errorHandlerMiddlewares_1.default);
exports.default = app;

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
const developerModel_1 = __importDefault(require("../models/developerModel"));
const apiResponse_1 = __importDefault(require("../utils/apiResponse"));
const asyncHandler_1 = __importDefault(require("../utils/asyncHandler"));
const apiError_1 = __importDefault(require("../utils/apiError"));
const getBenchDeveloper = (0, asyncHandler_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { bench } = req.query;
    let developer;
    if (bench) {
        developer = yield developerModel_1.default.find({ bench: "ONBENCH" });
    }
    else {
        developer = yield developerModel_1.default.find();
    }
    res.status(200).json(new apiResponse_1.default(developer, "All developers are currently in bench"));
}));
const changeBenchStatus = (0, asyncHandler_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { devId } = req.params;
    if (!devId) {
        return next(new apiError_1.default(400, "Developer id is required !"));
    }
    let developer = yield developerModel_1.default.findById(devId);
    if (!developer) {
        return next(new apiError_1.default(404, "Developer not found or invalid Id"));
    }
    if (developer.bench == "ONBENCH") {
        developer.bench = "ONPROJECT";
        yield developer.save();
    }
    else {
        developer.bench = "ONBENCH";
        yield developer.save();
    }
    res.status(200).json(new apiResponse_1.default({}, "Developer Bench Status Changed yet"));
}));
exports.default = { getBenchDeveloper, changeBenchStatus };

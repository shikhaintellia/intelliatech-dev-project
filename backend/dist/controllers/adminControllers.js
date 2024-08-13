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
const adminModel_1 = __importDefault(require("../models/adminModel"));
const apiError_1 = __importDefault(require("../utils/apiError"));
const apiResponse_1 = __importDefault(require("../utils/apiResponse"));
const asyncHandler_1 = __importDefault(require("../utils/asyncHandler"));
const cloundinary_1 = require("../utils/cloundinary");
const developerModel_1 = __importDefault(require("../models/developerModel"));
const signup = (0, asyncHandler_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, email, password, role } = req.body;
    if (!name || !email || !password || !role) {
        return next(new apiError_1.default(400, "All fields are required "));
    }
    const admin = yield adminModel_1.default.create({ name, email, password });
    res.status(201).json(new apiResponse_1.default(admin, "Admin Created Successfully"));
}));
const signin = (0, asyncHandler_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    if (!email || !password) {
        return next(new apiError_1.default(400, "Email & Password are requried"));
    }
    const admin = yield adminModel_1.default.findOne({ email });
    if (admin) {
        console.log("admin-role", admin.role);
    }
    if (!admin) {
        return next(new apiError_1.default(404, "You do not have admin credentials"));
    }
    const isMatched = yield admin.passwordIsMatch(password);
    if (!isMatched) {
        return next(new apiError_1.default(400, "Email or Password is Incorrect"));
    }
    const accessToken = yield admin.generateAccessToken();
    const accessCookieOptions = {
        secure: true,
        httpOnly: true,
        expires: new Date(Date.now() + 24 * 60 * 60 * 1000),
    };
    // res.status(200)
    // 	.cookie("accessToken", accessToken, accessCookieOptions)
    // 	.json(new ApiResponse(admin.role, "Admin login successfully"));
    res.status(200)
        .cookie("accessToken", accessToken, accessCookieOptions)
        .json({
        success: true,
        role: admin.role,
        message: "Admin login successfully",
        token: accessToken
    });
    console.log("token", accessToken);
}));
const createdDeveloper = (0, asyncHandler_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b, _c, _d;
    const { name, email, mainSkill, skills, engineerType, experience } = req.body;
    if (!name ||
        !email ||
        !mainSkill ||
        !skills ||
        !experience ||
        !engineerType) {
        return next(new apiError_1.default(400, "All fields are required"));
    }
    const profilePath = (_b = (_a = req.files) === null || _a === void 0 ? void 0 : _a.profile) === null || _b === void 0 ? void 0 : _b[0].path;
    const resumePath = (_d = (_c = req.files) === null || _c === void 0 ? void 0 : _c.resume) === null || _d === void 0 ? void 0 : _d[0].path;
    const profile = yield (0, cloundinary_1.uploadOnCloudinary)(profilePath);
    const resume = yield (0, cloundinary_1.uploadOnCloudinary)(resumePath);
    const developer = yield developerModel_1.default.create({
        name,
        email,
        experience,
        mainSkill,
        skills,
        engineerType,
        profile: {
            url: profile === null || profile === void 0 ? void 0 : profile.url,
            public_id: profile === null || profile === void 0 ? void 0 : profile.public_id,
        },
        resume: {
            url: resume === null || resume === void 0 ? void 0 : resume.url,
            public_id: resume === null || resume === void 0 ? void 0 : resume.public_id,
        },
    });
    res.status(200).json(new apiResponse_1.default(developer, "Developer added"));
}));
const updateDeveloperProfile = (0, asyncHandler_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b, _c, _d;
    const { name, email, mainSkill, skills, engineerType, experience } = req.body;
    const { devId } = req.params;
    const dev = yield developerModel_1.default.findById(devId);
    const profilePath = (_b = (_a = req.files) === null || _a === void 0 ? void 0 : _a.profile) === null || _b === void 0 ? void 0 : _b[0].path;
    const resumePath = (_d = (_c = req.files) === null || _c === void 0 ? void 0 : _c.resume) === null || _d === void 0 ? void 0 : _d[0].path;
    let profile;
    let resume;
    if (profilePath) {
        profile = yield (0, cloundinary_1.uploadOnCloudinary)(profilePath);
        yield (0, cloundinary_1.deletefile)(dev === null || dev === void 0 ? void 0 : dev.resume.public_id);
    }
    if (resumePath) {
        resume = yield (0, cloundinary_1.uploadOnCloudinary)(resumePath);
        yield (0, cloundinary_1.deletefile)(dev === null || dev === void 0 ? void 0 : dev.profile.public_id);
    }
    let devData = {
        name,
        skills,
        mainSkill,
        experience,
        engineerType,
        email,
    };
    if (resume) {
        devData.resume = {
            url: resume.url,
            public_id: resume.public_id,
        };
    }
    if (profile) {
        devData.profile = {
            url: profile.url,
            public_id: profile.public_id,
        };
    }
    const newDev = yield developerModel_1.default.findByIdAndUpdate(devId, devData, {
        new: true,
    });
    res.status(200).json(new apiResponse_1.default(newDev, "Developer Data Update Successfully"));
}));
exports.default = { signin, signup, createdDeveloper, updateDeveloperProfile };

"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const developerSchema = new mongoose_1.default.Schema({
    name: {
        type: String,
        required: [true, "Name is required !"],
    },
    email: {
        type: String,
        required: [true, "Name is required !"],
        unique: [true, "Email already exists !"],
    },
    mainSkill: {
        type: String,
        required: [true, "Main Skill is required !"],
    },
    skills: [
        {
            type: String,
            required: [true, "skills is required !"],
        },
    ],
    engineerType: {
        type: String,
        enum: ["Frontend", "Backend", "Devops & Cloud", "Full Stack"],
        default: "Full Stack",
    },
    profile: {
        url: {
            type: String,
        },
        public_id: {
            type: String,
        },
    },
    experience: {
        type: String,
    },
    resume: {
        url: {
            type: String,
        },
        public_id: {
            type: String,
        },
    },
    bench: {
        type: String,
        enum: ["ONBENCH", "ONPROJECT"],
        default: "ONBENCH",
    },
});
const Developer = mongoose_1.default.model("Developer", developerSchema);
exports.default = Developer;

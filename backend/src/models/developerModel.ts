import mongoose from "mongoose";

interface IDeveloper {
	name: string;
	email: string;
	mainSkill: string;
	skills: string;
	engineerType: string;
	profile: {
		url: string;
		public_id: string;
	};
	experience: string;
	resume: {
		url: string;
		public_id: string;
	};
	bench: string;
}

const developerSchema = new mongoose.Schema({
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

const Developer = mongoose.model<IDeveloper>("Developer", developerSchema);
export default Developer;

import { NextFunction, Request, Response } from "express";
import Admin from "../models/adminModel";
import ApiError from "../utils/apiError";
import ApiResponse from "../utils/apiResponse";
import asyncHandler from "../utils/asyncHandler";
import { deletefile, uploadOnCloudinary } from "../utils/cloundinary";
import Developer from "../models/developerModel";

interface MulterRequest extends Request {
	files: {
		profile?: Express.Multer.File[];
		resume?: Express.Multer.File[];
	};
	body: {
		name: string;
		email: string;
		mainSkill: string;
		skills: string;
		engineerType: string;
		experience: string;
	};
}
const signup = asyncHandler(
	async (req: Request, res: Response, next: NextFunction) => {
		const { name, email, password ,role} = req.body;

		if (!name || !email || !password || !role) {
			return next(new ApiError(400, "All fields are required "));
		}

		const admin = await Admin.create({ name, email, password });

		res.status(201).json(
			new ApiResponse(admin, "Admin Created Successfully")
		);
	}
);

const signin = asyncHandler(
	async (req: Request, res: Response, next: NextFunction) => {
		const { email, password } = req.body;

		if (!email || !password) {
			return next(new ApiError(400, "Email & Password are requried"));
		}

		const admin = await Admin.findOne({ email });
      if(admin){
		console.log("admin-role", admin.role)
	  }
		if (!admin) {
			return next(new ApiError(404, "You do not have admin credentials"));
		}

		const isMatched = await admin.passwordIsMatch(password);

		if (!isMatched) {
			return next(new ApiError(400, "Email or Password is Incorrect"));
		}

		const accessToken = await admin.generateAccessToken();

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
		console.log("token",accessToken)
	}
);

const createdDeveloper = asyncHandler(
	async (req: MulterRequest, res: Response, next: NextFunction) => {
		const { name, email, mainSkill, skills, engineerType, experience } =
			req.body;

		if (
			!name ||
			!email ||
			!mainSkill ||
			!skills ||
			!experience ||
			!engineerType
		) {
			return next(new ApiError(400, "All fields are required"));
		}

		const profilePath = req.files?.profile?.[0].path;

		const resumePath = req.files?.resume?.[0].path;

		const profile = await uploadOnCloudinary(profilePath!);
		const resume = await uploadOnCloudinary(resumePath!);

		const developer = await Developer.create({
			name,
			email,
			experience,
			mainSkill,
			skills,
			engineerType,
			profile: {
				url: profile?.url,
				public_id: profile?.public_id,
			},
			resume: {
				url: resume?.url,
				public_id: resume?.public_id,
			},
		});

		res.status(200).json(new ApiResponse(developer, "Developer added"));
	}
);

const updateDeveloperProfile = asyncHandler(
	async (req: MulterRequest, res: Response, next: NextFunction) => {
		const { name, email, mainSkill, skills, engineerType, experience } =
			req.body;

		const { devId } = req.params;

		const dev = await Developer.findById(devId);

		const profilePath = req.files?.profile?.[0].path;

		const resumePath = req.files?.resume?.[0].path;

		let profile;
		let resume;

		if (profilePath) {
			profile = await uploadOnCloudinary(profilePath!);
			await deletefile(dev?.resume.public_id!);
		}
		if (resumePath) {
			resume = await uploadOnCloudinary(resumePath);
			await deletefile(dev?.profile.public_id!);
		}

		let devData: { [key: string]: any } = {
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

		const newDev = await Developer.findByIdAndUpdate(devId, devData, {
			new: true,
		});

		res.status(200).json(
			new ApiResponse(newDev, "Developer Data Update Successfully")
		);
	}
);

export default { signin, signup, createdDeveloper, updateDeveloperProfile };

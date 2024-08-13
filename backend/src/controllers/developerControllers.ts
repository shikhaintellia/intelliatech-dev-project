import { NextFunction, Request, Response } from "express";
import Developer from "../models/developerModel";
import ApiResponse from "../utils/apiResponse";
import asyncHandler from "../utils/asyncHandler";
import ApiError from "../utils/apiError";

const getBenchDeveloper = asyncHandler(
	async (req: Request, res: Response, next: NextFunction) => {
		const { bench } = req.query;
		let developer;
		if (bench) {
			developer = await Developer.find({ bench: "ONBENCH" });
		} else {
			developer = await Developer.find();
		}

		res.status(200).json(
			new ApiResponse(developer, "All developers are currently in bench")
		);
	}
);

const changeBenchStatus = asyncHandler(
	async (req: Request, res: Response, next: NextFunction) => {
		const { devId } = req.params;

		if (!devId) {
			return next(new ApiError(400, "Developer id is required !"));
		}

		let developer = await Developer.findById(devId);

		if (!developer) {
			return next(new ApiError(404, "Developer not found or invalid Id"));
		}
		if (developer.bench == "ONBENCH") {
			developer.bench = "ONPROJECT";
			await developer.save();
		} else {
			developer.bench = "ONBENCH";
			await developer.save();
		}

		res.status(200).json(
			new ApiResponse({}, "Developer Bench Status Changed yet")
		);
	}
);

export default { getBenchDeveloper, changeBenchStatus };

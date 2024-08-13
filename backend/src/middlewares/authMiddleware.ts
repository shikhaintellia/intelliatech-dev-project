import { NextFunction, Request, Response } from "express";
import ApiError from "../utils/apiError";
import asyncHandler from "../utils/asyncHandler";
import jwt, { JwtPayload } from "jsonwebtoken";
import ENVS from "../constant/env";
import Admin from "../models/adminModel";

interface JwtPayloadType extends JwtPayload {
	_id: string;
	email: string;
}

const authMiddleware = asyncHandler(
	async (req: Request, res: Response, next: NextFunction) => {
		const { accessToken } =
			req.cookies || req.headers.authorization?.split(" ")[1];

		if (!accessToken) {
			return next(new ApiError(401, "user unauthorized !"));
		}
		try {
			const decodedToken = (await jwt.verify(
				accessToken,
				ENVS.get("ACCESS_TOKEN_SECRET")
			)) as JwtPayloadType;

			const user = await Admin.findById(decodedToken?._id);

			if (!user) {
				return next(
					new ApiError(
						401,
						"user unauthorized ! | user not found in db !"
					)
				);
			}

			req.admin = user;
		} catch (error) {
			return next(
				new ApiError(401, "Token was Expires please login again !")
			);
		}
		next();
	}
);

export default authMiddleware;

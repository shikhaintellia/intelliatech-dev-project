import { v2 as cloudinary } from "cloudinary";
import fs from "fs";
import ENVS from "../constant/env";

cloudinary.config({
	cloud_name: ENVS.get("CLOUDINARY_CLOUD_NAME"),
	api_key: ENVS.get("CLOUDINARY_API_KEY"),
	api_secret: ENVS.get("CLOUDINARY_API_SECRET"),
});

export const deletefile = async (public_id: string) => {
	await cloudinary.uploader.destroy(public_id);
};

export const uploadOnCloudinary = async (localFilePath: string) => {
	try {
		if (!localFilePath) return null;
		//upload the file on cloudinary
		const response = await cloudinary.uploader.upload(localFilePath, {
			resource_type: "auto",
			// max_bytes: 2 * 1024 * 1024,
			
		});
		console.log("response", response)

		fs.unlinkSync(localFilePath);
		return response;
	} catch (error) {
		fs.unlinkSync(localFilePath);
		return null;
	}
};

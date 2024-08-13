import { Request } from "express";
import multer, { diskStorage } from "multer";

const storage = diskStorage({
	destination: function (_, file: Express.Multer.File, cb: Function) {
		cb(null, "public/temp/");
	},
	filename: function (req: Request, file: Express.Multer.File, cb: Function) {
		cb(null, file.originalname);
	},
});

const upload = multer({ storage });

export default upload;

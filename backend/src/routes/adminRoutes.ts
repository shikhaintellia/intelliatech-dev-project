import { Router } from "express";
import adminControllers from "../controllers/adminControllers";
import authMiddleware from "../middlewares/authMiddleware";
import upload from "../middlewares/multerMiddleware";
const router = Router();

router.route("/signup").post(adminControllers.signup);
router.route("/signin").post(adminControllers.signin);
router.route("/create-developer").post(
	authMiddleware,
	upload.fields([
		{
			name: "profile",
			maxCount: 1,
		},
		{
			name: "resume",
			maxCount: 1,
		},
	]),
	adminControllers.createdDeveloper
);
router.route("/update-developer/:devId").put(
	authMiddleware,
	upload.fields([
		{
			name: "profile",
			maxCount: 1,
		},
		{
			name: "resume",
			maxCount: 1,
		},
	]),
	adminControllers.updateDeveloperProfile
);

export default router;

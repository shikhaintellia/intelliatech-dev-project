import { Router } from "express";
import developerControllers from "../controllers/developerControllers";
import authMiddleware from "../middlewares/authMiddleware";
const router = Router();

router.route("/").get(developerControllers.getBenchDeveloper);
router
	.route("/:devId")
	.patch(authMiddleware, developerControllers.changeBenchStatus);

export default router;

import connectDb from "./db";
import app from "./app";
import ENVS from "./constant/env";
const mongoUri = ENVS.get("MONGO_URI");
const port = ENVS.get("PORT") || 4000;

connectDb(mongoUri)
	.then(() => {
		app.listen(port, () => {
			console.log("SERVER STARTED AT :", port);
		});
	})
	.catch((error) => {
		console.log("MONGO DB CONNECTION FIALED :", error);
	});

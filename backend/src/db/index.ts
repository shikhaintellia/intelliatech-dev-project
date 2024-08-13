import ENVS from "../constant/env";
import mongoose from "mongoose";

const connectDb = async (uri: string) => {
	try {
		const { connection } = await mongoose.connect(
			`${uri}/${ENVS.get("DB_NAME")}`
		);
		console.log("MONGODB CONNECTED ON HOST :", connection.host);
	} catch (error) {
		console.log("MONGODB CONNECTION FAILED :", error);
	}
};

export default connectDb;

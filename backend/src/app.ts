import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import errorHandler from "./middlewares/errorHandlerMiddlewares";

const app = express();

app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true }));
app.use(
	// TODO : set origin
	cors({
		origin: "*",
		credentials: true,
	})
);
app.use(cookieParser());

app.get("/",(_,res)=>{
	res.send("working fine")
})

import adminRouter from "./routes/adminRoutes";
import developerRouter from "./routes/developerRoutes";
app.use("/api/admin", adminRouter);
app.use("/api/developers", developerRouter);
// app.use();

app.use(errorHandler);
export default app;

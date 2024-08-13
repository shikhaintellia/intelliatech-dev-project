import mongoose, { Document } from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import ENVS from "../constant/env";

export interface IAdmin extends Document {
	name: string;
	email: string;
	password: string;
	role:string;
	passwordIsMatch: (password: string) => boolean;
	generateAccessToken: () => string;
}

const adminSchema = new mongoose.Schema({
	name: {
		type: String,
	},
	email: {
		type: String,
		unique: true,
		required: true,
	},
	password: {
		type: String,
	},
	role:{
		type :String,
		required:true
	}
});
adminSchema.pre("save", async function (next) {
	if (this.isModified("password")) {
		//@ts-ignore
		this.password = await bcrypt.hash(this.password, 10);
	}
	next();
});

adminSchema.methods.passwordIsMatch = async function (password: string) {
	return await bcrypt.compare(password, this.password);
};

adminSchema.methods.generateAccessToken = async function () {
	const playload = {
		_id: this._id,
		email: this.email,
	};

	const token = await jwt.sign(playload, ENVS.get("ACCESS_TOKEN_SECRET"), {
		expiresIn: ENVS.get("ACCESS_TOKEN_EXPIRY"),
	});

	return token;
};

const Admin = mongoose.model<IAdmin>("Admin", adminSchema);

export default Admin;

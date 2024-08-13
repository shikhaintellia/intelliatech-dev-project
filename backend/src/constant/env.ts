import { config } from "dotenv";

config({
	path: "./.env",
});

const ENV = process.env;

const ENVS = {
	get(key: string) {

		const value = ENV[key];
		if (!value) {
			throw new Error(`ENV IS MISSING ${value}`);
		}

		return value;
	},
};


export default ENVS
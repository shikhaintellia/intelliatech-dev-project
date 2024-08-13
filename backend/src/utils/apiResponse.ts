class ApiResponse {
	data: any;
	message: string;
	success: boolean;
	// role:string;
	constructor(data: any, message: string, success: boolean = true,role?:string) {
		this.data = data;
		this.message = message;
		this.success = success;
		// this.role=role;
	}
}

export default ApiResponse;

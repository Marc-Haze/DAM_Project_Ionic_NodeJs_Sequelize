export interface User {
	id: number;
	password: string;
	username: string;
	isAdmin: boolean;
	darkMode: boolean;
	employee:{
		id: number;
		name: string;
		email: string;
		telephone: number;
		address: string;
		file: File;
		job: string;
	}
}
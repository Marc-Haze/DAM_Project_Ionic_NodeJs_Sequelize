export interface Maintenance {
	id: number;
	service: string;
	state: string;
	description: string;
	dock: string;
	note: string;
	employeeId: number;
	shipId: number;
	employee: {
		id: number;
		name: string;
		email: string;
		telephone: number;
		address: string;
		file: File;
		job: string;
	};
	ship: {
		id: number;
		name: string;
		type: string;
		client: string;
	};
}

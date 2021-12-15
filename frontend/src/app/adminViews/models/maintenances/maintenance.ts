export interface Maintenance {
	id: number;
	service: string;
	state: string;
	description: string;
	dock: string;
	note: string;
	employeeId: number;
	shipId: number;
}

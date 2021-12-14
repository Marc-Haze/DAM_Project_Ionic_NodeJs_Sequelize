export interface Employee {
	id: number;
	name: string;
    email: string;
    telephone: number;
    address: string;
    file: File;
    job: string;
    user: {
        id: number;
        password: string;
        username: string;
        filename: string;
        isAdmin: boolean;
        darkMode: boolean;
    };
}

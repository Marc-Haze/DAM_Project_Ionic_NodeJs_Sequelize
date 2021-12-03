export class Employee {
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

    constructor(){
        this.id=0;
        this.name="";
        this.email="";
        this.telephone=0;
        this.address="";
        this.job="";
        this.file=null;
    }
}

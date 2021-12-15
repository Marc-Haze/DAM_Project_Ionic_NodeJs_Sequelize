export interface AuthResponse {
    user: {
        id: number;
        password: string;
        username: string;
        isAdmin: boolean;
        darkMode: boolean;
        employeeId: number;
    },
    access_token: string
}

export interface AuthResponse {
    user: {
        id: number;
        password: string;
        username: string;
        isAdmin: boolean;
        darkMode: boolean;
    },
    access_token: string
}

import { User } from "./user.model";

export interface AuthResponse {
    token: string;
    refreshToken: string;
    expiresAt: Date;
    user: User;
}
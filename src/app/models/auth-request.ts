export interface AuthRequest {
    username: string;
    password: string;
}

export interface TokenResponse {
    access_roken: string;
    token_type: string;
}

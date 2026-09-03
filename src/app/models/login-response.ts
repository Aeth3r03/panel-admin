import { Usuario } from "./usuario";

export interface LoginResponse {
    access_token: string;
    user: Usuario;
}

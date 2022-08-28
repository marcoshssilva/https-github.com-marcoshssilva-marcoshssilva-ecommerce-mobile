import { ClienteDTO } from "./cliente.dto";

export interface LocalUser {
    token: string,
    email: string,
    expirationTime: number,
    cliente: ClienteDTO
}
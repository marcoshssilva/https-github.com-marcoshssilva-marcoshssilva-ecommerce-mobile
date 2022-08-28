import { EstadoDTO } from './estado.dto';

export interface CidadeDTO {
    id: string | number,
    nome?: string,
    estado?: EstadoDTO
}
import { EnderecoDTO } from "./endereco.dto";

export interface ClienteDTO {
    id: string | number,
    nome: string,
    email: string,
    imageUrl?: string,
    cpfOuCnpj?: string,
    perfil?: string[],
    telefones?: string[],
    tipo?: "PESSOAFISICA" | "PESSOAJURIDICA",
    enderecos?: EnderecoDTO[]
}
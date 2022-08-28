export interface ClienteNovoDTO {
    bairro: string,
    cep: string,
    cidadeId: number | string,
    complemento?: string,
    cpfOuCnpj: string,
    email: string,
    estadoId: number | string,
    logradouro: string,
    nome: string,
    numero: number | string,
    senha: string,
    telefone1: string,
    telefone2: string,
    telefone3: string,
    tipo: string | number
}
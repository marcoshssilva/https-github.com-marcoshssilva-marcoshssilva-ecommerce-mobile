export interface EnderecoDTO {
    id: string,
    logradouro: string,
    numero: string,
    complemento: string,
    bairro: string,
    cep: string,
    cidade: {
        id: number | string,
        nome: string,
        estado: {
            id: string,
            nome: string
        }
    }
}
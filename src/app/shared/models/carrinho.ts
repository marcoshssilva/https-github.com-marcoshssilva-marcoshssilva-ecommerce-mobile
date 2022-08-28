import { PagamentoDTO } from './pagamento.dto';
import { EnderecoDTO } from './endereco.dto';
import { RefDTO } from './ref.dto';
import { ItemCarrinho } from './itemcarrinho';

export interface Carrinho {
    cliente: RefDTO,
    itens: ItemCarrinho[],
    enderecoDeEntrega: EnderecoDTO,
    pagamento: PagamentoDTO
}
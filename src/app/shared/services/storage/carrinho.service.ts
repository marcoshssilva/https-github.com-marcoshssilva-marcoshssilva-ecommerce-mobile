import { ClienteService } from '../domain/cliente.service';
import { EnderecoDTO } from '../../models/endereco.dto';
import { PagamentoDTO } from '../../models/pagamento.dto';
import { ProdutoDTO } from '../../models/produto.dto';
import { Carrinho } from '../../models/carrinho';
import { Injectable } from '@angular/core';
import { StorageService } from './storage.service';

@Injectable({
    providedIn: 'root'
})
export class CarrinhoService {

    constructor(
        private storage: StorageService,
        private clienteService: ClienteService
    ) { }

    criarOuLimparCarrinho(): Carrinho {
        let cliente = this.clienteService.ClienteLogado
        let c: Carrinho = { cliente: { id: cliente?.id || null }, itens: [], enderecoDeEntrega: null, pagamento: null }
        this.storage.setCarrinhoDeCompras(c);

        return this.storage.getCarrinhoDeCompras();
    }

    getCarrinhoDeCompras(): Carrinho {
        let c: Carrinho = this.storage.getCarrinhoDeCompras()
        if (c == null) {
            return this.criarOuLimparCarrinho()
        }
        return c
    }

    adicionarProdutoAoCarrinho(produto: ProdutoDTO): Carrinho {
        let c = this.storage.getCarrinhoDeCompras()
        let exists = c.itens.findIndex(i => i.produto.id == produto.id)

        if (exists == -1) {
            c.itens.push({ quantidade: 1, produto: produto })
        } else {
            c.itens[exists].quantidade++
        }

        this.storage.setCarrinhoDeCompras(c)
        return this.storage.getCarrinhoDeCompras()
    }

    removerProdutoDoCarrinho(produto: ProdutoDTO): Carrinho {
        let c = this.getCarrinhoDeCompras();
        c.itens = c.itens.filter(p => p.produto.id != produto.id);
        this.storage.setCarrinhoDeCompras(c);

        return this.storage.getCarrinhoDeCompras();
    }

    incrementarProduto(produto: ProdutoDTO): Carrinho {
        let c = this.getCarrinhoDeCompras();
        let pos = c.itens.findIndex(item => item.produto.id == produto.id);

        if (pos != (-1)) c.itens[pos].quantidade++

        this.storage.setCarrinhoDeCompras(c);
        return this.storage.getCarrinhoDeCompras();
    }

    decrementarProduto(produto: ProdutoDTO): Carrinho {
        let c = this.getCarrinhoDeCompras();
        let pos = c.itens.findIndex(item => item.produto.id == produto.id);

        if (pos != (-1)) {
            c.itens[pos].quantidade--
            if (c.itens[pos].quantidade < 1) {
                return this.removerProdutoDoCarrinho(produto)
            }
        }

        this.storage.setCarrinhoDeCompras(c);
        return this.storage.getCarrinhoDeCompras();
    }

    getTotal(): number {
        let c = this.getCarrinhoDeCompras();
        let sum = 0
        c.itens.forEach(item => sum += item.quantidade * item.produto.preco)
        return sum
    }

    definirPagamento(pagamento: PagamentoDTO): Carrinho {
        let c = this.getCarrinhoDeCompras()
        c.pagamento = pagamento
        this.storage.setCarrinhoDeCompras(c)
        return c
    }

    definirEndereco(endereco: EnderecoDTO): Carrinho {
        let c = this.getCarrinhoDeCompras()
        c.enderecoDeEntrega = endereco
        this.storage.setCarrinhoDeCompras(c)
        return c
    }
}

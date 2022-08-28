import { StorageService } from './../shared/services/storage/storage.service';
import { ProdutoDTO } from './../shared/models/produto.dto';
import { CarrinhoService } from '../shared/services/storage/carrinho.service';
import { Component, OnInit } from '@angular/core';
import { Carrinho } from '../shared/models/carrinho';

@Component({
    selector: 'app-carrinho-de-compras',
    templateUrl: './carrinho-de-compras.page.html',
    styleUrls: ['./carrinho-de-compras.page.scss'],
})
export class CarrinhoDeComprasPage implements OnInit {

    carrinho: Carrinho

    constructor(
        private storage: StorageService,
        private carrinhoService: CarrinhoService
    ) { }

    ngOnInit() { }

    ionViewWillEnter() {
        this.carrinho = this.storage.getCarrinhoDeCompras()
    }

    remover(p: ProdutoDTO): void {
        this.carrinho = this.carrinhoService.removerProdutoDoCarrinho(p)
    }

    incrementar(p: ProdutoDTO): void {
        this.carrinho = this.carrinhoService.incrementarProduto(p)
    }

    decrementar(p: ProdutoDTO): void {
        this.carrinho = this.carrinhoService.decrementarProduto(p)
    }

    get Total(): number {
        return this.carrinhoService.getTotal();
    }

}

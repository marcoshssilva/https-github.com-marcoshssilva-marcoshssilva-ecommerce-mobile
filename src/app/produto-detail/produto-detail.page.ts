import { CarrinhoService } from '../shared/services/storage/carrinho.service';
import { ProdutoService } from './../shared/services/domain/produto.service';
import { ProdutoDTO } from './../shared/models/produto.dto';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NavController } from '@ionic/angular';

@Component({
    selector: 'app-produto-detail',
    templateUrl: './produto-detail.page.html',
    styleUrls: ['./produto-detail.page.scss'],
})
export class ProdutoDetailPage implements OnInit {

    item: ProdutoDTO;

    constructor(
        private route: ActivatedRoute,
        private produtoService: ProdutoService,
        private carrinhoService: CarrinhoService,
        private navigator: NavController
    ) { }

    ngOnInit() { }

    ionViewWillEnter() {
        let id = this.route.snapshot.params['id']
        this.produtoService.buscarProduto(id).subscribe(
            res => {
                this.item = res as ProdutoDTO
            }, 
            err => {
                console.log(err)
            }
        )

    }

    adicionarAoCarrinho(p: ProdutoDTO) {
        this.carrinhoService.adicionarProdutoAoCarrinho(p)
        this.navigator.navigateForward("/carrinho-de-compras")
    }
}

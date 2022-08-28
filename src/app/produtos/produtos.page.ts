import { ProdutoService } from './../shared/services/domain/produto.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProdutoDTO } from '../shared/models/produto.dto';
import { NavController } from '@ionic/angular';

@Component({
    selector: 'app-produtos',
    templateUrl: './produtos.page.html',
    styleUrls: ['./produtos.page.scss'],
})
export class ProdutosPage implements OnInit {

    produtos: ProdutoDTO[] = [];

    constructor(
        private produtoService: ProdutoService,
        private route: ActivatedRoute,
        private navigator: NavController
    ) { }

    ngOnInit() { }

    ionViewWillEnter() {
        let id: number;
        if (this.route.snapshot.params['id']) {
            id = this.route.snapshot.params['id']
            this.produtoService.buscarPelaCategoria(id).subscribe(
                res => {
                    this.produtos = res?.content
                },
                err => {
                    console.log(err)
                }
            )
        } else {
            this.navigator.navigateBack("/categorias")
        }

    }

    abrirProduto(id: string | number) {
        this.navigator.navigateForward(`/produto-detail/${id}`)
    }

}

import { CategoriaDTO } from './../shared/models/categoria.dto';
import { CategoriaService } from './../shared/services/domain/categoria.service';
import { Component, OnInit, Output } from '@angular/core';
import { API_CONFIG } from '../shared/config/api.config';
import { NavController } from '@ionic/angular';

@Component({
    selector: 'app-categorias',
    templateUrl: './categorias.page.html',
    styleUrls: ['./categorias.page.scss'],
})
export class CategoriasPage implements OnInit {

    items: CategoriaDTO[] = []

    constructor(
        private categoriaService: CategoriaService,
        private navigator: NavController
    ) { }

    ngOnInit() { }

    ionViewDidEnter() {
        this.categoriaService.buscarTodos().subscribe(
            res => {
                this.items = res;
                console.log("dados carregados!")
                console.log(this.items)
            },
            error => {
                console.log(error.error)
            });
    }

    abrirProdutos(categoria_id: string | number) {
        this.navigator.navigateForward(`/produtos/${categoria_id}`)
    }
    
}

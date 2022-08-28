import { NavController } from '@ionic/angular';
import { CarrinhoService } from '../shared/services/storage/carrinho.service';
import { Component, OnInit } from '@angular/core';
import { Carrinho } from '../shared/models/carrinho';

@Component({
    selector: 'app-escolher-pagamento',
    templateUrl: './escolher-pagamento.page.html',
    styleUrls: ['./escolher-pagamento.page.scss'],
})
export class EscolherPagamentoPage implements OnInit {

    pedido: Carrinho
    parcelas: number[] = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]
    pagamento = {
        tipo: '',
        parcelas: null
    }

    constructor(
        private carrinhoService: CarrinhoService,
        private navigator: NavController
    ) { }

    ngOnInit(): void { }

    ionViewWillEnter(): void {
        this.pedido = this.carrinhoService.getCarrinhoDeCompras();
    }

    proximo() {
        this.pedido.pagamento = {
            "@type": this.pagamento.tipo,
            numeroDeParcelas: this.pagamento.parcelas
        }

        this.carrinhoService.definirPagamento(this.pedido.pagamento)
        this.navigator.navigateForward("/pedido-confirmado")
    }
}

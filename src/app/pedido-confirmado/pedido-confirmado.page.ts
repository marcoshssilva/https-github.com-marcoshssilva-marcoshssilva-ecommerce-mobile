import { NavController, ToastController } from '@ionic/angular';
import { ClienteService } from './../shared/services/domain/cliente.service';
import { ClienteDTO } from './../shared/models/cliente.dto';
import { CarrinhoService } from '../shared/services/storage/carrinho.service';
import { StorageService } from './../shared/services/storage/storage.service';
import { Component, OnInit } from '@angular/core';
import { Carrinho } from '../shared/models/carrinho';
import { PedidoService } from '../shared/services/domain/pedido.service';

@Component({
    selector: 'app-pedido-confirmado',
    templateUrl: './pedido-confirmado.page.html',
    styleUrls: ['./pedido-confirmado.page.scss'],
})
export class PedidoConfirmadoPage implements OnInit {

    cliente: ClienteDTO
    pedido: Carrinho

    constructor(
        private storage: StorageService,
        private clienteService: ClienteService,
        private pedidoService: PedidoService,
        private carrinho: CarrinhoService,
        private navigator: NavController,
        private alertController: ToastController
    ) { }

    ngOnInit(): void { }

    ionViewWillEnter() {
        this.pedido = this.storage.getCarrinhoDeCompras()
        this.cliente = this.clienteService.ClienteLogado
    }

    get Total(): number {
        let sum = 0
        this.pedido?.itens.forEach(p => sum += p.produto.preco * p.quantidade)
        return sum
    }

    checkout() {
        this.pedidoService.cadastrarPedido(this.pedido)
            .subscribe(
                res => {
                    this.carrinho.criarOuLimparCarrinho()
                    this.alertSuccessMessage()
                },
                err => {
                    if (err.status == 403) {
                        this.navigator.navigateRoot("/home")
                    } else {
                        this.alertFailMessage()
                    }
                }
            )
    }

    private async alertSuccessMessage(): Promise<void> {
        this.alertController.create({
            header: "Tudo certo!",
            message: "Seu pedido foi recebido e foi enviado detalhes pelo seu email.",
            buttons: [
                "OK"
            ],
            position: "top",
            mode: "ios",
            duration: 3000,
            color: 'success'

        }).then(async res => {
            this.navigator.navigateBack("/categorias")
            await res.present()
        })
    }

    private async alertFailMessage(): Promise<void> {
        this.alertController.create({
            header: "Nada Feito!",
            message: "Por favor, cheque todos os dados se estão corretamente e tente novamente!",
            buttons: [
                "OK"
            ],
            mode: "ios",
            position: "top",
            duration: 3000,
            color: 'danger'

        }).then(async res => {
            this.navigator.navigateBack("/carrinho-de-compras")
            await res.present()
        })
    }
}

import { NavController } from '@ionic/angular';
import { CarrinhoService } from '../shared/services/storage/carrinho.service';
import { EnderecoDTO } from './../shared/models/endereco.dto';
import { Component, OnInit } from '@angular/core';
import { ClienteService } from '../shared/services/domain/cliente.service';
import { ClienteDTO } from '../shared/models/cliente.dto';

@Component({
    selector: 'app-escolher-endereco',
    templateUrl: './escolher-endereco.page.html',
    styleUrls: ['./escolher-endereco.page.scss'],
})
export class EscolherEnderecoPage implements OnInit {

    cliente: ClienteDTO

    constructor(
        private clienteService: ClienteService,
        private carrinhoService: CarrinhoService,
        private navigator: NavController,
    ) { }

    ngOnInit() { }

    ionViewWillEnter() {
        this.cliente = this.clienteService.ClienteLogado
    }

    selecionarEndereco(endereco: EnderecoDTO) {
        this.carrinhoService.definirEndereco(endereco)
        this.navigator.navigateForward("/escolher-pagamento")
    }
}

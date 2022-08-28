import { Component, OnInit, ViewChild } from '@angular/core';
import { NavController, ToastController } from '@ionic/angular';
import { CidadeDTO } from '../shared/models/cidade.dto';
import { ClienteNovoDTO } from '../shared/models/clientenovo.dto';
import { CidadeService } from '../shared/services/domain/cidade.service';
import { ClienteService } from '../shared/services/domain/cliente.service';
import { EstadoDTO } from './../shared/models/estado.dto';
import { EstadoService } from './../shared/services/domain/estado.service';

@Component({
    selector: 'app-cadastro',
    templateUrl: './cadastro.page.html',
    styleUrls: ['./cadastro.page.scss'],
})
export class CadastroPage implements OnInit {

    estados: EstadoDTO[];
    cidades: CidadeDTO[];

    @ViewChild("slider") slider: HTMLIonSlidesElement

    clienteNovo: ClienteNovoDTO = {
        bairro: null,
        cep: null,
        cidadeId: null,
        complemento: null,
        cpfOuCnpj: null,
        email: null,
        estadoId: null,
        logradouro: null,
        numero: null,
        nome: null,
        senha: null,
        telefone1: null,
        telefone2: null,
        telefone3: null,
        tipo: '1'
    };


    constructor(
        private cidadeService: CidadeService,
        private estadoService: EstadoService,
        private clienteService: ClienteService,
        private toastController: ToastController,
        private navigator: NavController
    ) { }

    ngOnInit() { }

    cadastrarUsuario() {
        this.clienteService.cadastrar(this.clienteNovo).subscribe(
            async () => {
                const t = await this.toastController.create({
                    header: 'Parabéns',
                    message: 'Seu cadastro foi concluido com sucesso!',
                    buttons: ['OK'],
                    mode: 'ios',
                    color: 'success',
                    duration: 3000
                })
                this.navigator.navigateRoot("/home")
                return t.present()
            },
            err => { }
        );


    }

    ionViewWillEnter() {
        this.slider.lockSwipes(true)
        this.estadoService.buscarTodos()
            .subscribe(
                res => {
                    this.estados = res;
                },
                err => console.log(err))
    }

    async atualizarCidades(): Promise<void> {
        let id = this.clienteNovo.estadoId;
        if (id && id != null && id != '') {
            this.clienteNovo.cidadeId = ''
            this.cidadeService.buscarTodos(id).subscribe(
                res => {
                    this.cidades = res
                },
                err => console.log(err))
        }
    }

    nextSlide() {
        this.slider.lockSwipes(false);
        this.slider.slideNext().then(
            () => {
                this.slider.lockSwipes(true);
            }
        )

    }

    backSlide() {
        this.slider.lockSwipes(false);
        this.slider.slidePrev().then(
            () => {
                this.slider.lockSwipes(true);
            }
        )
    }

    formatarTelefone(tel: string, f: number) {
        tel = tel.replace("(", "")
        tel = tel.replace(")", "")
        tel = tel.replace("-", "")
        tel = tel.replace(" ", '')

        tel = tel.replace(/(\d{2})(\d{5})(\d{4})/, (r, arg1, arg2, arg3) => {
            return "(" + arg1 + ") " + arg2 + "-" + arg3
        })

        switch (f) {
            case 1: this.clienteNovo.telefone1 = tel
                break;

            case 2: this.clienteNovo.telefone2 = tel
                break;

            case 3: this.clienteNovo.telefone3 = tel
                break;
        }
    }
}

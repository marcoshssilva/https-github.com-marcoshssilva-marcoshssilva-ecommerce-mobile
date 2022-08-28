import { CameraService } from './../shared/services/utils/camera.service';
import { ClienteService } from './../shared/services/domain/cliente.service';
import { Component, OnInit } from '@angular/core';
import { ClienteDTO } from '../shared/models/cliente.dto';
import { StorageService } from '../shared/services/storage/storage.service';
import { NavController } from '@ionic/angular';

@Component({
    selector: 'app-profile',
    templateUrl: './profile.page.html',
    styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {

    cliente: ClienteDTO;

    constructor(
        private storage: StorageService,
        private clienteService: ClienteService,
        private navigator: NavController,
        private cameraService: CameraService
    ) { }

    ngOnInit() { }

    ionViewWillEnter() {
        this.cliente = this.storage.getUsuarioLogado().cliente
    }

    atualizarDados() {
        let localUser = this.storage.getUsuarioLogado();
        if (localUser && localUser.email) {
            this.clienteService.buscarPeloEmail(localUser.email)
                .subscribe(res => {
                    this.cliente = res as ClienteDTO
                }, err => {
                    if (err.status == 403) this.navigator.navigateRoot("/home")

                })

        } else {
            this.navigator.navigateRoot("/home")
        }
    }

    abrirCamera() {
        this.cameraService.getImageAsBase64().then(
            res => {
                this.enviarImagem(res).subscribe(
                    () => {
                        this.atualizarDados()
                    },
                    err => {
                        console.log(err)
                    }
                )
            },
            err => {
                console.log(err)
            }
        )
    }

    enviarImagem(imgBase64: string) {
        return this.clienteService.uploadBase64Picture(imgBase64)
    }

}

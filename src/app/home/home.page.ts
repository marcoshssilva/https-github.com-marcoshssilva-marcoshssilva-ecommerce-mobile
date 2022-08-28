import { AppMinimize } from '@ionic-native/app-minimize/ngx';
import { Component } from '@angular/core';
import { LoadingController, NavController } from '@ionic/angular';
import { CredenciaisDTO } from '../shared/models/credenciais.dto';
import { AuthService } from '../shared/services/authentication/auth.service';
import { StorageService } from '../shared/services/storage/storage.service';

@Component({
    selector: 'app-home',
    templateUrl: 'home.page.html',
    styleUrls: ['home.page.scss'],
})
export class HomePage {

    dadosLogin: CredenciaisDTO = {
        email: '',
        senha: ''
    }

    constructor(
        private navigator: NavController,
        private auth: AuthService,
        private storage: StorageService,
        private loading: LoadingController,
        private appMinimize: AppMinimize
    ) { }

    ionViewWillEnter() {

        if (this.storage.getUsuarioLogado()) {
            this.auth.refreshToken()
                .subscribe(
                    res => {
                        this.auth.loginComSucesso(res.headers.get('Authorization'))
                        this.navigator.navigateRoot('/categorias')
                    }, err => { }
                )
        }

    }

    async login() {
        const telaLoading = await this.createLoading
        await telaLoading.present()
        this.auth.autenticarUsuario(this.dadosLogin).subscribe(
            res => {
                this.auth.loginComSucesso(res.headers.get('Authorization'))
                telaLoading.remove()
                this.navigator.navigateRoot("/categorias");
            }, err => {
                telaLoading.remove()
                console.log(err)

            }
        )

    }

    async closeApp() {
        await this.appMinimize.minimize()
    }

    get createLoading(): Promise<HTMLIonLoadingElement> {
        return this.loading.create({
            backdropDismiss: false,
            message: "Aguarde um momento",
            animated: true,
            spinner: 'bubbles',
            cssClass: 'custom-loading-login',
            mode: 'ios'
        })
    }
}

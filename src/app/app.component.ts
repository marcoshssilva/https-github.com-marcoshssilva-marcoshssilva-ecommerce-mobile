import { AuthService } from './shared/services/authentication/auth.service';
import { Component } from '@angular/core';

import { Platform, NavController, MenuController } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

@Component({
    selector: 'app-root',
    templateUrl: 'app.component.html',
    styleUrls: ['app.component.scss']
})
export class AppComponent {
    constructor(
        private platform: Platform,
        private splashScreen: SplashScreen,
        private statusBar: StatusBar,
        private navigator: NavController,
        private authService: AuthService,
        private menu: MenuController
    ) {
        this.initializeApp();
    }

    initializeApp() {
        this.platform.ready().then(() => {
            this.statusBar.styleDefault();
            this.splashScreen.hide();
            // Desabilita o menu pelo arrastar
            this.menu.swipeGesture(false, "custom-menu-bar")
            // Habilita a barra de status na cor branca
            this.statusBar.backgroundColorByHexString("#FFF")
        });
    }

    async fecharMenu(): Promise<void> {
        await this.menu.toggle();
    }

    logout(): void {
        this.authService.logout();
        this.fecharMenu()
        this.navigator.navigateRoot('/home')
    }

}

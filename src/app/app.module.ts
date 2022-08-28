import { CameraService } from './shared/services/utils/camera.service';
import { ProdutoService } from './shared/services/domain/produto.service';
import { CidadeService } from './shared/services/domain/cidade.service';
import { FormsModule } from '@angular/forms';
import { AuthInterceptorProvider } from './shared/interceptors/auth.interceptor';
import { StorageService } from './shared/services/storage/storage.service';
import { CategoriaService } from './shared/services/domain/categoria.service';
import { NgModule } from '@angular/core';
import { HttpClientModule } from "@angular/common/http";
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { AuthService } from './shared/services/authentication/auth.service';
import { ClienteService } from './shared/services/domain/cliente.service';
import { ErrorInterceptorProvider } from './shared/interceptors/error.intercept';
import { EstadoService } from './shared/services/domain/estado.service';
import { PedidoService } from './shared/services/domain/pedido.service';
import { Camera } from '@ionic-native/camera/ngx';
import { CarrinhoService } from './shared/services/storage/carrinho.service';
import { AppMinimize } from '@ionic-native/app-minimize/ngx';

@NgModule({
    declarations: [AppComponent],
    entryComponents: [],
    imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule, HttpClientModule, FormsModule],
    providers: [
        StatusBar,
        SplashScreen,
        { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
        AuthInterceptorProvider,
        ErrorInterceptorProvider,
        CategoriaService,
        AuthService,
        StorageService,
        CarrinhoService,
        ClienteService,
        CidadeService,
        EstadoService,
        ProdutoService,
        PedidoService,
        Camera,
        CameraService,
        AppMinimize
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }

import { ClienteService } from './../domain/cliente.service';
import { CarrinhoService } from '../storage/carrinho.service';
import { Observable } from 'rxjs';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { API_CONFIG } from './../../config/api.config';
import { CredenciaisDTO } from './../../models/credenciais.dto';
import { Injectable } from '@angular/core';
import { StorageService } from '../storage/storage.service';

import jwtDecode from 'jwt-decode'; // Instalado via NPM INSTALL jwt-decode --save

@Injectable({
    providedIn: 'root'
})
export class AuthService {

    readonly END_POINT_LOGIN: string = API_CONFIG.baseUrl + "/login"
    readonly END_POINT_AUTH: string = API_CONFIG.baseUrl + "/auth"

    constructor(
        private http: HttpClient,
        private storage: StorageService,
        private cart: CarrinhoService,
        private clienteService: ClienteService
    ) { }

    autenticarUsuario(cred: CredenciaisDTO) {
        return this.http.post(this.END_POINT_LOGIN, cred,
            {
                observe: 'response',
                responseType: 'text'
            })
    }

    loginComSucesso(token: String) {
        let tok = token.substring(7); // Removendo a palavra 'Bearer ' do Token
        let details = JSON.parse(JSON.stringify(jwtDecode(tok)))

        this.storage.setUsuarioLogado({
            token: tok, email: details.sub, expirationTime: details.exp, cliente: null
        })

        let userLogged = this.storage.getUsuarioLogado()
        let carrinho = this.cart.criarOuLimparCarrinho()

        this.clienteService.buscarPeloEmail(userLogged.email).subscribe(
            res => {
                userLogged.cliente = res
                this.storage.setUsuarioLogado(userLogged)
                carrinho.cliente.id = userLogged.cliente.id
                this.storage.setCarrinhoDeCompras(carrinho)
            }
        )
    }

    logout() {
        this.storage.setUsuarioLogado(null)
        this.storage.setCarrinhoDeCompras(null)
    }

    refreshToken(): Observable<HttpResponse<any>> {
        return this.http.post(
            this.END_POINT_AUTH + '/refresh_token',
            {},
            {
                observe: 'response',
                responseType: 'text'
            }
        )
    }
}

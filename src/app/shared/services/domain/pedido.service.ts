import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { API_CONFIG } from '../../config/api.config';
import { Carrinho } from '../../models/carrinho';

@Injectable({
    providedIn: 'root'
})
export class PedidoService {

    constructor(
        private http: HttpClient
    ) { }

    cadastrarPedido(pedido: Carrinho): Observable<any> {
        return this.http.post(
            `${API_CONFIG.baseUrl}/pedidos/`,
            pedido,
            {
                responseType: 'text',
                observe: 'response'
            }
        )
    }
}

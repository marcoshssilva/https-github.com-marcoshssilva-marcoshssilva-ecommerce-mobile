import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { API_CONFIG } from '../../config/api.config';
import { Observable } from 'rxjs';
import { ProdutoDTO } from '../../models/produto.dto';

@Injectable({
    providedIn: 'root'
})
export class ProdutoService {

    public readonly END_POINT: string = API_CONFIG.baseUrl + '/produtos'

    constructor(
        private http: HttpClient
    ) { }

    buscarPelaCategoria(id: string | number): Observable<any> {
        return this.http.get<any>(`${this.END_POINT}/?categorias=${id}`);
    }

    buscarProduto(id: string | number): Observable<ProdutoDTO> {
        return this.http.get<ProdutoDTO>(`${this.END_POINT}/${id}`);
    }
    
}

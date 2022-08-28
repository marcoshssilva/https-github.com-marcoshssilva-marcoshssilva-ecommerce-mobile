import { CategoriaDTO } from './../../models/categoria.dto';
import { Observable } from 'rxjs';
import { API_CONFIG } from './../../config/api.config';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class CategoriaService {

    readonly END_POINT: string = API_CONFIG.baseUrl + "/categorias"

    constructor(
        private http: HttpClient
    ) { }

    buscarTodos(): Observable<CategoriaDTO[]> {
        return this.http.get<CategoriaDTO[]>(this.END_POINT);
    }
}

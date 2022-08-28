import { CidadeDTO } from './../../models/cidade.dto';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { API_CONFIG } from '../../config/api.config';

@Injectable({
    providedIn: 'root'
})
export class CidadeService {

    constructor(
        private http: HttpClient
    ) { }

    buscarTodos(id_estado: string | number): Observable<CidadeDTO[]> {
        return this.http.get<CidadeDTO[]>(`${API_CONFIG.baseUrl}/estados/${id_estado}/cidades`);
    }
}

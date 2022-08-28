import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { EstadoDTO } from 'src/app/shared/models/estado.dto';
import { API_CONFIG } from '../../config/api.config';

@Injectable({
    providedIn: 'root'
})
export class EstadoService {

    constructor(
        private http: HttpClient
    ) { }

    buscarTodos(): Observable<EstadoDTO[]> {
        return this.http.get<EstadoDTO[]>(`${API_CONFIG.baseUrl}/estados`);
    }
}

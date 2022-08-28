import { StorageService } from './../storage/storage.service';
import { API_CONFIG } from './../../config/api.config';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ClienteNovoDTO } from '../../models/clientenovo.dto';
import { ClienteDTO } from '../../models/cliente.dto';
import { CameraService } from '../utils/camera.service';

@Injectable({
    providedIn: 'root'
})
export class ClienteService {

    readonly END_POINT: string = API_CONFIG.baseUrl + '/clientes'

    constructor(
        private http: HttpClient,
        private storage: StorageService,
        private cameraService: CameraService
    ) { }

    buscarPeloEmail(email: string): Observable<any> {
        return this.http.get(this.END_POINT + `/email?value=${email}`)
    }

    buscarPeloID(id: number | string): Observable<any> {
        return this.http.get(this.END_POINT + `/${id}`)
    }

    cadastrar(obj: ClienteNovoDTO) {
        console.log(obj)
        return this.http.post(`${this.END_POINT}`, obj,
            {
                observe: 'response',
                responseType: 'text'
            })
    }

    get ClienteLogado(): ClienteDTO {
        return this.storage.getUsuarioLogado().cliente
    }

    uploadBase64Picture(base64String: string): Observable<any> {
        let imagem = this.cameraService.base64ToBlob(base64String)
        let formData: FormData = new FormData()
        formData.set("file", imagem, 'Image.jpg')

        return this.http.post(
            `${this.END_POINT}/picture`,
            formData,
            {
                observe: 'response',
                responseType: 'text'
            }
        );
    }
}

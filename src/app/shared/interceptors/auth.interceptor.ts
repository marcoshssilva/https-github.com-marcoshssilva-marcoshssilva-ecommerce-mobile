import { API_CONFIG } from './../config/api.config';
import { Observable } from 'rxjs';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HTTP_INTERCEPTORS } from "@angular/common/http";
import { Injectable } from '@angular/core';
import { StorageService } from '../services/storage/storage.service';

@Injectable({
    providedIn: 'root'
})
export class AuthInterceptor implements HttpInterceptor {

    constructor(
        private storage: StorageService
    ) { }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

        let localUser = this.storage.getUsuarioLogado()
        let isAPI = req.url.includes(API_CONFIG.baseUrl)

        if (localUser && isAPI) {
            const authReq = req.clone(
                { headers: req.headers.set('Authorization', 'Bearer ' + localUser.token) }
            )
            return next.handle(authReq);
        }

        return next.handle(req);
    }
}

export const AuthInterceptorProvider = {
    provide: HTTP_INTERCEPTORS,
    useClass: AuthInterceptor,
    multi: true
}
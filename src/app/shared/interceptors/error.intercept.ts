import { Observable, throwError } from 'rxjs';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HTTP_INTERCEPTORS } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { catchError } from 'rxjs/operators'
import { StorageService } from '../services/storage/storage.service';
import { AlertController, NavController } from '@ionic/angular';
import { FieldMessage } from '../models/fieldmessage';

@Injectable({
    providedIn: 'root'
})
export class ErrorInterceptor implements HttpInterceptor {

    constructor(
        private storage: StorageService,
        private alertController: AlertController,
        private navigator: NavController
    ) { }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(req).pipe(catchError(e => {
            let error = e;
            if (error.error) error = error.error

            if (!error.status) error = JSON.parse(error)

            switch (error.status) {
                case 403: this.handler403()
                    break;
                case 401: this.handler401(error)
                    break;
                case 422: this.handler422(error)
                    break;
                default: this.handlerDefault(error)
            }

            console.log("Erro detectado pelo interceptor: ")
            console.log(error)

            return throwError(error);
        }))
    }

    private async handler403() {
        this.storage.setUsuarioLogado(null)
    }

    private async handler401(error: any) {
        let alert = await this.alertController.create({
            header: 'Falha de Autenticação',
            message: error.message,
            backdropDismiss: false,
            buttons: ['OK']
        })

        await alert.present();
    }

    private async handler422(error: any) {
        const alert = await this.alertController.create({
            header: 'Sinto muito... encontramos uma falha no seu cadastro',
            message: this.listarErros(error?.errors),
            buttons: [
                {
                    text: 'Tentar novamente',
                    handler: () => { }
                }, {
                    text: 'Desistir',
                    role: 'cancel',
                    handler: () => this.navigator.navigateBack("/home")
                }
            ],
            mode: 'ios'
        })

        await alert.present();
    }

    private async handlerDefault(e) {
        let alert = await this.alertController.create({
            header: 'HTTP STATUS ' + e.status,
            message: 'ERROR ' + e.error,
            backdropDismiss: false,
            buttons: ['OK']
        })

        await alert.present();
    }

    private listarErros(obj: FieldMessage[]): string {
        let s: string = '';
        obj.forEach(e => {
            s += `<p><strong>${e.field}:</strong> ${e.message}</p>`
        });
        return s;
    }
}

export const ErrorInterceptorProvider = {
    useClass: ErrorInterceptor,
    provide: HTTP_INTERCEPTORS,
    multi: true
}
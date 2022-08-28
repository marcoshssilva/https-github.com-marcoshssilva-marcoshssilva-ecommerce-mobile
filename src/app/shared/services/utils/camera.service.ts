import { AlertController } from '@ionic/angular';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class CameraService {

    constructor(
        private camera: Camera,
        private alert: AlertController
    ) { }

    public readonly OPTIONS_CAMERA_BASE64: CameraOptions = {
        quality: 100,
        destinationType: this.camera.DestinationType.DATA_URL,
        encodingType: this.camera.EncodingType.JPEG,
        mediaType: this.camera.MediaType.PICTURE,
        correctOrientation: true
    }

    public async getImageAsBase64(): Promise<string> {
        let base64Data: string = undefined
        await this.camera.getPicture(this.OPTIONS_CAMERA_BASE64).then(
            base64Image => {
                base64Data = "data:image/jpg;base64," + base64Image
            }, err => {

                this.alert.create({
                    header: 'Não foi possível capturar a imagem',
                    message: err
                }).then(alert => {
                    alert.present()
                })

            }
        )
        return base64Data
    }

    public base64ToBlob(base64String: string): Blob {
        var byteString = atob(base64String.split(',')[1]);
        var mimeString = base64String.split(',')[0].split(':')[1].split(';')[0]
        var ab = new ArrayBuffer(byteString.length)
        var ia = new Uint8Array(ab)

        for (var i = 0; i < byteString.length; i++) {
            ia[i] = byteString.charCodeAt(i)
        }

        return new Blob([ab], { type: mimeString })
    }

}

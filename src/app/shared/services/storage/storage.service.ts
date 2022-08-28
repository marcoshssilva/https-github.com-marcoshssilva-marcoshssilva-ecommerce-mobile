import { Carrinho } from './../../models/carrinho';
import { STORAGE_KEYS } from './../../config/storage.config';
import { LocalUser } from './../../models/localuser';
import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class StorageService {

    constructor() { }

    getUsuarioLogado(): LocalUser {
        let u = localStorage.getItem(STORAGE_KEYS.localUser);
        return u === null ? null : JSON.parse(u);
    }

    setUsuarioLogado(u: LocalUser): void {
        if (u === null) localStorage.removeItem(STORAGE_KEYS.localUser)
        else {
            localStorage.setItem(STORAGE_KEYS.localUser, JSON.stringify(u))
        }
    }

    getCarrinhoDeCompras(): Carrinho {
        let c = localStorage.getItem(STORAGE_KEYS.carrinhoDeCompras);
        if (c == null) return null

        return JSON.parse(c)
    }

    setCarrinhoDeCompras(c: Carrinho): void {
        (c == null) ? localStorage.removeItem(STORAGE_KEYS.carrinhoDeCompras) : localStorage.setItem(STORAGE_KEYS.carrinhoDeCompras, JSON.stringify(c))
    }

}

import { Injectable } from '@angular/core';
import { Product } from '../models/product.model';
import { LocalStorageService } from './local-storage.service';


@Injectable({
    providedIn: 'root'
})

export class CarritoService {

    lCarrito: Product[] = []

    constructor(
        private _localStorage: LocalStorageService
    ) { }

    getCarrito() {
        if (this._localStorage.get('Carrito')) {
            this.lCarrito = JSON.parse(this._localStorage.get('Carrito'))
            return this.lCarrito
        }
        else {
            return this.lCarrito
        }
    }

    addCarrito(productoCarrito: Product) {

        let carritoStorage: Product[] = []

        if (this._localStorage.get('Carrito') === null) {
            this.lCarrito.push(productoCarrito)
            carritoStorage.push(productoCarrito)
            this._localStorage.set('Carrito', JSON.stringify(carritoStorage))

            return 1
        }
        else {
            carritoStorage = JSON.parse(this._localStorage.get('Carrito'))

            for (let producto of carritoStorage) {
                if (producto.id == productoCarrito.id) {
                    return 0
                }
            }

            this.lCarrito.push(productoCarrito)
            carritoStorage.push(productoCarrito)
            this._localStorage.set('Carrito', JSON.stringify(carritoStorage))
            return 1
        }

    }

    deleteCarrito(productoCarrito: Product) {

        for (let index = 0; index < this.lCarrito.length; index++) {
            if (productoCarrito == this.lCarrito[index]) {
                this.lCarrito.splice(index, 1)
                this._localStorage.set('Carrito', JSON.stringify(this.lCarrito))
            }
        }

    }

    getSubTotal(lCarrito) {

        let montoCarrito = 0

        if (lCarrito.length > 0) {
            for (let producto of lCarrito) {
                montoCarrito = montoCarrito + producto.salesPrice
            }
        }

        return montoCarrito
    }
}

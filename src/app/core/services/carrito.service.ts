import { isNull } from '@angular/compiler/src/output/output_ast';
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

        // Carrito sin productos
        if (!this._localStorage.get('Carrito')) {
            return this.lCarrito
        }

        // Carrito con productos
        else {
            this.lCarrito = this._localStorage.get('Carrito')
            return this.lCarrito
        }
    }

    addCarrito(producto: Product) {

        // Carrito sin productos
        if (!this._localStorage.get('Carrito')) {

            this.lCarrito.push(producto)
            this._localStorage.set('Carrito', this.lCarrito)
            return true
        }

        // Carrito con productos
        else {
            this.lCarrito = this._localStorage.get('Carrito')

            // ¿Producto ingresante ya existe en el carrito?
            for (let item of this.lCarrito) {
                if (item.id == producto.id) {
                    return false
                }
            }

            this.lCarrito.push(producto)
            this._localStorage.set('Carrito', this.lCarrito)
            return true
        }
    }

    deleteCarrito(productoId: number) {
        const filteredCarrito = this.lCarrito.filter((item) => item.id !== productoId)
        this._localStorage.set('Carrito', filteredCarrito)
        this.lCarrito = filteredCarrito
    }

    getSubTotal(lCarrito: Product[]) {

        let montoCarrito = 0

        if (lCarrito.length > 0) {
            for (let producto of lCarrito) {
                montoCarrito = montoCarrito + producto.salesPrice
            }
        }

        return montoCarrito
    }
}

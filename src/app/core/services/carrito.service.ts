import { Injectable } from '@angular/core';


@Injectable({
    providedIn: 'root'
})

export class CarritoService {

    lCarrito: any[] = []

    constructor() { }

    getCarrito() {
        if (localStorage.getItem('Carrito') === null) {
            return this.lCarrito
        }
        else {
            this.lCarrito = JSON.parse(localStorage.getItem('Carrito'))
            return this.lCarrito
        }
    }

    addCarrito(productoCarrito: any) {

        let carritoStorage: any[] = []

        if (localStorage.getItem('Carrito') === null) {
            this.lCarrito.push(productoCarrito)
            carritoStorage.push(productoCarrito)
            localStorage.setItem('Carrito', JSON.stringify(carritoStorage))
            return 1
        }
        else {
            carritoStorage = JSON.parse(localStorage.getItem('Carrito'))

            for (let producto of carritoStorage) {
                if (producto.id == productoCarrito.id) {
                    return 0
                }
            }

            this.lCarrito.push(productoCarrito)
            carritoStorage.push(productoCarrito)
            localStorage.setItem('Carrito', JSON.stringify(carritoStorage))
            return 1
        }

    }

    deleteCarrito(productoCarrito: any) {

        for (let index = 0; index < this.lCarrito.length; index++) {
            if (productoCarrito == this.lCarrito[index]) {
                this.lCarrito.splice(index, 1)
                localStorage.setItem('Carrito', JSON.stringify(this.lCarrito))
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

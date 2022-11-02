import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { CarritoService } from 'src/app/core/services/carrito.service';
import Swal from 'sweetalert2';


@Component({
    selector: 'app-shopping-cart',
    templateUrl: './shopping-cart.component.html'
})

export class ShoppingCartComponent implements OnInit {

    lCarrito: any[] = []
    openlogin: boolean = false
    urlPorDefecto: string = '../../../../../assets/img/productodefault.jpg'

    constructor(
        private _router: Router,
        private _carritoService: CarritoService,
    ) { }

    ngOnInit() {
        this.getCarrito()
    }

    getCarrito() {
        this.lCarrito = this._carritoService.getCarrito()
    }

    getSubTotal() {
        let subTotal = this._carritoService.getSubTotal(this.lCarrito)
        return subTotal
    }

    deleteCarrito(carrito) {
        this._carritoService.deleteCarrito(carrito)
        this.getCarrito()
        if (!this.lCarrito.length) {
            this._router.navigate(['/catalogo'])
            return
        }
    }
    
    registrarPedido() {

        if (!this.lCarrito.length) {
            Swal.fire({
                title: '¡Atención!',
                text: 'No tiene productos en su carrito de compras',
                toast: true,
                position: 'top-end',
                icon: 'warning',
                timer: 4000,
                showCloseButton: true,
                showConfirmButton: false
            }).then((result) => {
                this._router.navigate(['/catalogo'])
            })
            return
        }

        this._router.navigate(['/pedido'])
    }

}
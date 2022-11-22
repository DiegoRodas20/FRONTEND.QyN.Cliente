import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { opacity } from 'src/app/core/animations/opacity.animation';
import { Alert } from 'src/app/core/models/alert.model';
import { Product } from 'src/app/core/models/product.model';
import { CarritoService } from 'src/app/core/services/carrito.service';
import { LocalStorageService } from 'src/app/core/services/local-storage.service';
import Swal from 'sweetalert2';
import { AlertService } from '../alert/alert.service';


@Component({
    selector: 'app-shopping-cart',
    templateUrl: './shopping-cart.component.html',
    styleUrls: ['./shopping-cart.component.scss'],
    animations: [opacity]

})

export class ShoppingCartComponent implements OnInit {

    lCarrito: Product[] = []

    constructor(
        private _router: Router,
        private _carritoService: CarritoService,
        private _localStorage: LocalStorageService,
        private _alertService: AlertService
    ) { }

    ngOnInit() {
        this.observableCarrito()
    }

    observableCarrito() {
        this._localStorage.watch('Carrito').subscribe(
            (result) => {
                if (result) {
                    this.lCarrito = result
                }
                else {
                    this.lCarrito
                }
            }
        )
    }

    getMontoTotal() {
        let montoTotal = this._carritoService.getMontoTotal(this.lCarrito)
        return montoTotal
    }

    deleteCarrito(productoId: number) {

        this._carritoService.deleteCarrito(productoId)

        if (!this.lCarrito.length) {
            this._router.navigate(['/catalogo']).then(() => {
                window.location.reload();
            })
            return
        }
    }

    registrarPedido() {

        if (!this.lCarrito.length) {

            let contenido: Alert = {
                type: 'alert',
                contenido: 'No tiene productos en su carrito de compras'
            }

            this._alertService.open(contenido)
            return
        }

        else if (!localStorage.getItem('Usuario')) {

            let contenido: Alert = {
                type: 'alert',
                contenido: 'Debe iniciar su sesión'
            }

            this._alertService.open(contenido)
            return
        }

        this._router.navigate(['/pedido']).then(() => {
            window.location.reload();
        })
    }

}
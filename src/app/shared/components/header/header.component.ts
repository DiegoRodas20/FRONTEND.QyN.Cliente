import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CarritoService } from 'src/app/core/services/carrito.service';



@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss']
})

export class HeaderComponent implements OnInit {

    lCarrito: any[] = []

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
    }

    showCatalogo() {
        this._router.navigate(['/catalogo'])
    }

    registrarPedido(){
        this._router.navigate(['/pedido'])
    }

}
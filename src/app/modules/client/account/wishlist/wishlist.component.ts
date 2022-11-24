import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { opacity } from 'src/app/core/animations/opacity.animation';
import { Alert } from 'src/app/core/models/alert.model';
import { Product } from 'src/app/core/models/product.model';
import { CarritoService } from 'src/app/core/services/carrito.service';
import { WishListService } from 'src/app/core/services/wish-list.service';
import { AlertService } from 'src/app/shared/components/alert/alert.service';


@Component({
    selector: 'app-wishlist',
    templateUrl: './wishlist.component.html',
    animations: [opacity]
})

export class WishListComponent implements OnInit {

    lWishList: Product[] = []

    constructor(
        private _alertService: AlertService,
        private _carritoService: CarritoService,
        private _router: Router,
        private _wishListService: WishListService
    ) { }

    ngOnInit() {
        this.getWishList()
    }

    getWishList() {
        this.lWishList = this._wishListService.getWishList()
    }

    registrarProductoCarrito(producto: Product) {

        let productoCarrito: Product = {
            id: producto.id,
            code: producto.code,
            name: producto.name,
            type: producto.type,
            quantity: producto.quantity == undefined ? 1 : producto.quantity,
            salesPrice: producto.salesPrice,
            carritoPrice: producto.carritoPrice == null ? producto.salesPrice : producto.carritoPrice,
            urlImage: producto.urlImage,
        }

        let estado = this._carritoService.addCarrito(productoCarrito)

        if (estado) {
            let contenido: Alert = {
                type: 'success',
                contenido: 'Se añadio el producto en el carrito'
            }
            this._alertService.open(contenido)
        }

        else {
            let contenido: Alert = {
                type: 'alert',
                contenido: 'El producto ya se encuentra en el carrito'
            }
            this._alertService.open(contenido)
        }
    }

    calcularPrecioxCantidad(cantidad: number, producto: Product) {
        producto.carritoPrice = cantidad * producto.salesPrice
        producto.quantity = cantidad
    }

    eliminarProductoFavorito(productoId: number) {

        this._wishListService.deleteWishList(productoId)
        this.getWishList()

        if (!this.lWishList.length) {
            this._router.navigate(['/catalogo']).then(() => {
                window.location.reload();
            })
            return
        }
    }

}
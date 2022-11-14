import { Component, OnInit } from '@angular/core';
import { CarritoService } from 'src/app/core/services/carrito.service';
import { ProductService } from 'src/app/core/services/product.service';
import { Product } from 'src/app/core/models/product.model';
import { ResponseData } from 'src/app/core/models/response.model';
import { Alert } from 'src/app/core/models/alert.model';
import { AlertService } from 'src/app/shared/components/alert/alert.service';


@Component({
    selector: 'app-catalogo',
    templateUrl: 'catalogo.component.html'
})

export class CatalogoComponent implements OnInit {

    lCatalogo: Product[] = []
    Mensaje: string
    showFilter: boolean = true
    tooltip: boolean = false

    constructor(
        private _alertService   : AlertService,
        private _carritoService : CarritoService,
        private _productService : ProductService,
    ) { }

    ngOnInit() {
        this.getCatalogoProductos()
    }

    async getCatalogoProductos() {

        try {
            const data: ResponseData = await this._productService.getProductos().toPromise()

            this.Mensaje = data.message
            this.lCatalogo = data.data
        }

        catch (error) {
            console.log("Error: ", error)
        }

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

    calcularPrecioxCantidad(event: any, producto: Product) {
        producto.carritoPrice = Number(event.target.value) * producto.salesPrice
        producto.quantity = Number(event.target.value)
    }

    showFilters() {
        this.showFilter = !this.showFilter
    }

}
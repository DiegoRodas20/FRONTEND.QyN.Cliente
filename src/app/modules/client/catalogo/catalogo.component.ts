import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CarritoService } from 'src/app/core/services/carrito.service';
import { CatalogoService } from 'src/app/core/services/catalogo.service';
import { Producto } from 'src/app/shared/models/producto.model';
import Swal from 'sweetalert2';


@Component({
    selector: 'app-catalogo',
    templateUrl: 'catalogo.component.html'
})

export class CatalogoComponent implements OnInit {

    lCatalogo: any[] = []

    constructor(
        private _router: Router,
        private _catalogoService: CatalogoService,
        private _carritoService: CarritoService
    ) { }

    ngOnInit() {

        this.getCatalogo()

    }

    async getCatalogo() {

        try {
            const data: any = await this._catalogoService.getCatalogo().toPromise()
            console.log(data)

            this.lCatalogo = data.data
        }

        catch (error) {
            console.log("Error: ", error)
        }

    }

    registrarProductoCarrito(producto) {

        console.log(producto)

        let productoCarrito: Producto = {
            id: producto.id,
            code: producto.code,
            name: producto.name,
            type: producto.type,
            salesPrice: producto.salesPrice,
            purchasePrice: producto.purchasePrice,
            stock: producto.stock,
            showInCatalog: producto.showInCatalog,
            urlImage: producto.urlImage,
            cantidad: producto.cantidad == undefined ? 1 : producto.cantidad
        }

        var estado = this._carritoService.addCarrito(productoCarrito)

        if (estado == 0) {
            console.log('NO SE PUEDE REPETIR EL PRODUCTO')
            Swal.fire({
                title: '¡Atención!',
                text: 'No puedes añadir un producto que ya se encuentra en el carrito',
                toast: true,
                position: 'top-end',
                icon: 'warning',
                timer: 4000,
                showConfirmButton: false
            })
        }

        else {
            Swal.fire({
                title: '¡Éxito!',
                text: 'Se añadio el producto en el carrito',
                toast: true,
                position: 'top-end',
                icon: 'success',
                timer: 4000,
                showConfirmButton: false
            })

            console.log('REGISTRADO EN EL CARRITO')
        }
    }

    calcularPrecioxCantidad(event, producto) {
        producto.salesPrice = Number(event.target.value) * Number(producto.purchasePrice + 10);
        producto.cantidad = Number(event.target.value)
    }

}
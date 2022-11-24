import { Component, OnInit } from '@angular/core';
import { CarritoService } from 'src/app/core/services/carrito.service';
import { ProductService } from 'src/app/core/services/product.service';
import { Product } from 'src/app/core/models/product.model';
import { ResponseData } from 'src/app/core/models/response.model';
import { Alert } from 'src/app/core/models/alert.model';
import { AlertService } from 'src/app/shared/components/alert/alert.service';
import { FormControl } from '@angular/forms';
import { opacity } from 'src/app/core/animations/opacity.animation';
import { CategoryService } from 'src/app/core/services/category.service';
import { Category } from 'src/app/core/models/category.model';
import { WishListService } from 'src/app/core/services/wish-list.service';


@Component({
    selector: 'app-catalogo',
    templateUrl: 'catalogo.component.html',
    animations: [opacity]
})

export class CatalogoComponent implements OnInit {

    lCatalogo: Product[] = []
    lCategory: Category[] = []
    productName: string

    Mensaje: string
    showFilter: boolean = false
    tooltip: boolean = false

    filtro = new FormControl()
    filtroCategoria = new FormControl()
    p: number = 1;

    constructor(
        private _alertService: AlertService,
        private _carritoService: CarritoService,
        private _categoryService: CategoryService,
        private _productService: ProductService,
        private _wishListService: WishListService
    ) { }

    ngOnInit() {
        this.getCatalogoProductos()
        this.getCategorias()
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

    async getCategorias() {

        try {
            const data: ResponseData = await this._categoryService.getCategory().toPromise()

            this.lCategory = data.data
        }

        catch (error) {
            console.log("Error:", error)
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

    calcularPrecioxCantidad(cantidad: number, producto: Product) {
        producto.carritoPrice = cantidad * producto.salesPrice
        producto.quantity = cantidad
    }

    showFilters() {
        this.showFilter = !this.showFilter
    }

    agregarProductoFavoritos(producto: Product) {

        let productoWishlist: Product = {
            id: producto.id,
            code: producto.code,
            name: producto.name,
            type: producto.type,
            salesPrice: producto.salesPrice,
            urlImage: producto.urlImage,
            isSelected: true
        }

        let estado = this._wishListService.addWishList(productoWishlist)

        if (estado) {
            let contenido: Alert = {
                type: 'success',
                contenido: 'Se añadio el producto en la lista de deseos'
            }
            this._alertService.open(contenido)

            this.lCatalogo = this.lCatalogo.map((value) => {
                if (value.id == producto.id) {
                    value.isSelected = true
                }
                return value
            })
        }

        else {
            let contenido: Alert = {
                type: 'alert',
                contenido: 'El producto ya se encuentra en la lista de deseos'
            }
            this._alertService.open(contenido)
        }
    }

    itemChecked(categoryName: string) {

        if (!this.filtroCategoria.value)
            this.productName = categoryName
        else
            this.productName = ''
    }

}
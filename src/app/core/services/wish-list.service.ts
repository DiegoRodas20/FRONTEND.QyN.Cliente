import { Injectable } from '@angular/core';
import { Product } from '../models/product.model';
import { LocalStorageService } from './local-storage.service';


@Injectable({
    providedIn: 'root'
})

export class WishListService {

    lWishlist: Product[] = []

    constructor(
        private _localStorage: LocalStorageService
    ) { }

    getWishList() {

        // Wishlist sin productos
        if (!this._localStorage.get('Wishlist')) {
            return this.lWishlist
        }

        // Wishlist con productos
        else {
            this.lWishlist = this._localStorage.get('Wishlist')
            return this.lWishlist
        }
    }

    addWishList(producto: Product) {

        // Wishlist sin productos
        if (!this._localStorage.get('Wishlist')) {

            this.lWishlist.push(producto)
            this._localStorage.set('Wishlist', this.lWishlist)
            return true
        }

        // Wishlist con productos
        else {
            this.lWishlist = this._localStorage.get('Wishlist')

            // ¿Producto ingresante ya existe en el Wishlist?
            for (let item of this.lWishlist) {
                if (item.id == producto.id) {
                    return false
                }
            }

            this.lWishlist.push(producto)
            this._localStorage.set('Wishlist', this.lWishlist)
            return true
        }
    }

    deleteWishList(productoId: number) {
        this.lWishlist = this._localStorage.get('Wishlist')
        const filteredWishlist = this.lWishlist.filter((item) => item.id !== productoId)
        this._localStorage.set('Wishlist', filteredWishlist)
    }

}

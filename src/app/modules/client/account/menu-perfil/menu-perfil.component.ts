import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Order } from 'src/app/core/models/order.model';
import { Product } from 'src/app/core/models/product.model';
import { ResponseData } from 'src/app/core/models/response.model';
import { UserClient } from 'src/app/core/models/user-client.model';
import { LocalStorageService } from 'src/app/core/services/local-storage.service';
import { OrderService } from 'src/app/core/services/order.service';
import { WishListService } from 'src/app/core/services/wish-list.service';

@Component({
    selector: 'app-menu-perfil',
    templateUrl: './menu-perfil.component.html'
})

export class MenuPerfilComponent implements OnInit {

    user: UserClient
    tipoDocumento: string
    lWishList: Product[] = []
    PedidosCliente: any[] = []

    // Opciones Menu
    optionMenu: number = 1

    constructor(
        private _router: Router,
        private _localStorage: LocalStorageService,
        private _orderService: OrderService,
        private _wishListService: WishListService
    ) { }

    ngOnInit() {
        this.gotoProfile()
        this.getUserData()
        this.getPedidosCliente()
        this.observableWishList()
    }

    getUserData() {
        let userData = JSON.parse(localStorage.getItem('Usuario'))
        if (userData) {
            this.user = userData.data
            this.tipoDocumento = this.user.client.typeDocument
        }
    }

    observableWishList() {
        this._localStorage.watch('Wishlist').subscribe(
            (result) => {
                if (result) {
                    this.lWishList = result
                }
                else {
                    this.lWishList
                }
            }
        )
    }

    async getPedidosCliente() {
        try {
            const data: ResponseData = await this._orderService.getPedidosxCliente()
            this.PedidosCliente = data.data
        }

        catch (error) {
            console.log("Error: ", error)
        }
    }
    
    gotoProfile() {
        this.optionMenu = 1
    }

    gotoOrders() {
        this.optionMenu = 2
    }

    gotoWishList(){
        this.optionMenu = 3
    }

    gotoHome() {
        this._router.navigate(['/home']).then(() => {
            window.location.reload();
        })
    }

    cerrarSesion() {
        localStorage.clear()
        this.gotoHome()
    }

}
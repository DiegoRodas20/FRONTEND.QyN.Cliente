import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { ResponseData } from 'src/app/core/models/response.model';
import { UserClient } from 'src/app/core/models/user-client.model';
import { ClientService } from 'src/app/core/services/client.service';
import { OrderService } from 'src/app/core/services/order.service';


@Component({
    selector: 'app-pedidos',
    templateUrl: './pedidos.component.html'
})

export class PedidosComponent implements OnInit {

    user: UserClient
    PedidosCliente: any[] = []
    tipoDocumento: string

    constructor(
        private _router: Router,
        private _orderService: OrderService

    ) { }

    ngOnInit() {
        this.getUserData()
        this.getPedidosCliente()
    }

    getUserData() {
        let userData = JSON.parse(localStorage.getItem('Usuario'))
        console.log(userData)
        if (userData) {
            this.user = userData.data
            this.tipoDocumento = this.user.client.typeDocument
        }
    }

    async getPedidosCliente() {
        try {
            const data: ResponseData = await this._orderService.getPedidosxCliente().toPromise()
            this.PedidosCliente = data.data

            console.log(data)
        }

        catch (error) {
            console.log("Error: ", error)
        }
    }
    gotoProfile() {
        this._router.navigate(['/miperfil']).then(() => {
            window.location.reload();
        })
    }

    gotoOrdersxID() {
        this._router.navigate(['/mispedidos']).then(() => {
            window.location.reload();
        })
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

    getSubTotal() {
        let montoCarrito = 0

        if (this.PedidosCliente.length > 0) {
            for (let producto of this.PedidosCliente) {
                for(let product of producto.orderDetails){
                    montoCarrito = montoCarrito + product.salesPrice
                }
            }
        }
        return montoCarrito
    }

}
import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Order } from 'src/app/core/models/order.model';
import { ResponseData } from 'src/app/core/models/response.model';
import { UserClient } from 'src/app/core/models/user-client.model';
import { ClientService } from 'src/app/core/services/client.service';
import { OrderService } from 'src/app/core/services/order.service';


@Component({
    selector: 'app-mispedidos',
    templateUrl: './mispedidos.component.html'
})

export class MisPedidosComponent implements OnInit {

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
            console.log('PEDIDO', data)
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

    getMontoTotal(pedido: Order) {
        let montoPedido = 0
        for (let producto of pedido.orderDetails) {
            montoPedido = montoPedido + (producto.salesPrice * producto.quantity)
        }
        return montoPedido
    }

}
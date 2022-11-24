import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { opacity } from 'src/app/core/animations/opacity.animation';
import { Order } from 'src/app/core/models/order.model';
import { ResponseData } from 'src/app/core/models/response.model';
import { UserClient } from 'src/app/core/models/user-client.model';
import { ClientService } from 'src/app/core/services/client.service';
import { OrderService } from 'src/app/core/services/order.service';


@Component({
    selector: 'app-mispedidos',
    templateUrl: './mispedidos.component.html',
    animations: [opacity]
})

export class MisPedidosComponent implements OnInit {

    user: UserClient
    PedidosCliente: any[] = []
    tipoDocumento: string
    idOrder: number
    p: number = 1;

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
        if (userData) {
            this.user = userData.data
            this.tipoDocumento = this.user.client.typeDocument
        }
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

    gotoOrderTracking(idOrder: number) {
        this._router.navigate([`/order-tracking/${idOrder}`]).then(() => {
            window.location.reload();
        })
    }

    changeIdOrder(idOrder: number) {
        this.idOrder = idOrder
    }

    getMontoTotal(pedido: Order) {
        let montoPedido = 0
        for (let producto of pedido.orderDetails) {
            montoPedido = montoPedido + (producto.salesPrice * producto.quantity)
        }
        return montoPedido
    }

    colorStatusPedido(orderstatus: number) {

        switch (orderstatus) {
            case 1:
                return 'bg-primary'
                break;
            case 2:
                return 'bg-danger'
                break;
            case 3:
                return 'bg-success'
                break;
            case 4:
                return 'bg-info'
                break;
            case 5:
                return 'bg-warning'
                break;
            case 6:
                return 'bg-dark'
                break;
            case 7:
                return 'bg-success'
                break;
            default:
                return ''
                break;
        }
    }

}
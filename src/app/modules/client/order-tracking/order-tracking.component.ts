import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Alert } from 'src/app/core/models/alert.model';
import { MapBoxService } from 'src/app/core/services/mapbox.service';
import { OrderService } from 'src/app/core/services/order.service';
import { AlertService } from 'src/app/shared/components/alert/alert.service';


@Component({
    selector: 'app-order-tracking',
    templateUrl: 'order-tracking.component.html'
})

export class OrderTrackingComponent implements OnInit {

    lOrderHistorial: any[]
    idOrder: number

    constructor(
        private _mapService: MapBoxService,
        private _orderService: OrderService,
        private _alertService: AlertService,
        private _route: ActivatedRoute
    ) {
        this.idOrder = Number(this._route.snapshot.paramMap.get('id'))
    }

    ngOnInit() {
        this.getHistorialPedido()
    }

    async getHistorialPedido() {

        try {
            const data: any = await this._orderService.getOrderHistory(this.idOrder)

            this.lOrderHistorial = data.data
            let contenido: Alert = {
                type: 'success',
                contenido: data.message
            }
            this._alertService.open(contenido)
        }

        catch (error) {
            console.log(error)

            let contenido: Alert = {
                type: 'error',
                contenido: error.error.error
            }
            this._alertService.open(contenido)
        }
    }

}
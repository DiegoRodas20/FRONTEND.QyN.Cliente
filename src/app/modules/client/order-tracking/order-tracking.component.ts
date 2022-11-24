import { AfterViewInit, Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Map, Popup, Marker, LngLatLike } from 'mapbox-gl';
import { ActivatedRoute } from '@angular/router';
import { Alert } from 'src/app/core/models/alert.model';
import { MapBoxService } from 'src/app/core/services/mapbox.service';
import { OrderService } from 'src/app/core/services/order.service';
import { AlertService } from 'src/app/shared/components/alert/alert.service';
import { PlacesResponse } from 'src/app/core/models/places.model';


@Component({
    selector: 'app-order-tracking',
    templateUrl: 'order-tracking.component.html'
})

export class OrderTrackingComponent implements OnInit, AfterViewInit {

    lOrderHistorial: any[] = []
    Pedido: any
    idOrder: number
    map: Map

    constructor(
        private _alertService: AlertService,
        private _mapboxService: MapBoxService,
        private _orderService: OrderService,
        private _route: ActivatedRoute
    ) {
        this.idOrder = Number(this._route.snapshot.paramMap.get('id'))
    }

    ngOnInit() {
        this.getPedidoById(this.idOrder)
        this.getHistorialPedido(this.idOrder)
    }

    ngAfterViewInit() {
        this.getAdress()
        this.crearMapBox()
    }

    async getPedidoById(idOrder: number) {

        try {
            const data: any = await this._orderService.getOrderById(idOrder)
            this.Pedido = data.data

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

    async getHistorialPedido(idOrder: number) {

        try {
            const data: any = await this._orderService.getOrderHistory(idOrder)

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

    crearMapBox() {

        this.map = new Map({
            container: 'map',
            style: 'mapbox://styles/mapbox/streets-v12',
            center: this._mapboxService.locationDefault,
            zoom: 14,
        })
        this._mapboxService.setMap(this.map)
        this.getPlaceByCoords()
    }

    async getAdress() {

        try {
            const data: PlacesResponse = await this._mapboxService.getPlacesByQuery(this.Pedido.address).toPromise()
            this.getPlacesByQuery(data.features[0])
        }

        catch (error) {
            console.log("Error: ", error)
        }
    }

    getPlacesByQuery(address: any) {
        this._mapboxService.flyTo(address.center)
        this._mapboxService.createMarkersFromPlaces(address)
    }

    getPlaceByCoords() {
        this.map.on('click', async (event) => {

            this._mapboxService.flyTo(event.lngLat)

            const data: PlacesResponse = await this._mapboxService.getPlaceByCoords(event.lngLat.lng, event.lngLat.lat).toPromise()
            const address = data.features[0]

            this._mapboxService.createMarkersFromPlaces(address)
        })
    }

}
import { AfterViewInit, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MapBoxService } from 'src/app/core/services/mapbox.service';
import { Map, Popup, Marker } from 'mapbox-gl';
import { PlacesResponse } from 'src/app/core/models/places.model';
import { opacity } from 'src/app/core/animations/opacity.animation';
import { AlertService } from '../alert/alert.service';
import { Alert } from 'src/app/core/models/alert.model';

@Component({
    selector: 'address-map',
    templateUrl: 'address-map.component.html',
    styleUrls: ['./address-map.component.scss'],
    animations: [opacity]
})

export class AddressMapComponent implements AfterViewInit {

    formDireccion: FormGroup
    lAddresses: any[] = []
    showResults: boolean = false
    map: Map

    @Output() address = new EventEmitter<string>()
    @Output() close = new EventEmitter<number>();

    constructor(
        private _formBuilder: FormBuilder,
        private _mapboxService: MapBoxService,
        private _alertService: AlertService
    ) { }

    ngOnInit() {
        this.crearFormDireccion()
        this.crearMapBox()
    }

    ngAfterViewInit() {
        this.crearMapBox()
        // this.prueba()
    }

    crearFormDireccion() {
        this.formDireccion = this._formBuilder.group({
            address: [null, [Validators.required]]
        })
    }

    crearMapBox() {

        if (!this._mapboxService.useLocation) throw Error('No se tiene la localizacion')

        this.map = new Map({
            container: 'map',
            style: 'mapbox://styles/mapbox/streets-v12',
            center: this._mapboxService.useLocation,
            zoom: 14,
        })

        this.map.on('load', () => this.map.resize())

        // const popup = new Popup().setHTML(`
        //     <h6>Aqui estoy</h6>
        //     <span>Estoy en este lugar del mundo</span>`
        // )

        // const marker = new Marker({ color: 'red' })
        //     .setLngLat(this._mapboxService.useLocation)
        //     .setPopup(popup)
        //     .addTo(this.map)

        // const markerDiv = marker.getElement();

        // markerDiv.addEventListener('mouseenter', () => marker.togglePopup());
        // markerDiv.addEventListener('mouseleave', () => marker.togglePopup());

        this._mapboxService.setMap(this.map)

        this.getPlaceByCoords()
    }

    async getAdress() {

        try {

            if (this.formDireccion.invalid) {
                this.showResults = false
                return
            }

            let form = this.formDireccion.value
            const data: PlacesResponse = await this._mapboxService.getPlacesByQuery(form.address).toPromise()

            this.lAddresses = data.features
            this.showResults = true
        }

        catch (error) {
            console.log("Error: ", error)
        }
    }

    getPlaceByCoords() {
        this.map.on('click', async (event) => {

            this._mapboxService.flyTo(event.lngLat)

            const data: PlacesResponse = await this._mapboxService.getPlaceByCoords(event.lngLat.lng, event.lngLat.lat).toPromise()
            const address = data.features[0]

            this._mapboxService.createMarkersFromPlaces(address)
            this.formDireccion.controls['address'].setValue(address.place_name)
        })
    }

    getPlacesByQuery(address: any) {
        this._mapboxService.flyTo(address.center)
        this._mapboxService.createMarkersFromPlaces(address)
        this.formDireccion.controls['address'].setValue(address.place_name)
        this.showResults = false
    }

    registrarAddress() {

        if (this.formDireccion.invalid) {

            let contenido: Alert = {
                type: 'alert',
                contenido: 'Debe ingresar una dirección'
            }

            this._alertService.open(contenido)
            return
        }

        let form = this.formDireccion.value
        this.address.emit(form.address)
        this.close.emit(2)
    }

    onCloseModal() {
        this.formDireccion.reset()
    }

    cssValidate(control: string) {
        if (this.formDireccion.controls[control].touched) {
            if (this.formDireccion.controls[control].errors) return 'invalid'
            else return 'valid'
        }
        else return ''
    }

}
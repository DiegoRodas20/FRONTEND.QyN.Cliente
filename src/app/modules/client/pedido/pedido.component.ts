import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Alert } from 'src/app/core/models/alert.model';
import { RegisterOrder } from 'src/app/core/models/order.model';
import { Product } from 'src/app/core/models/product.model';
import { ResponseData } from 'src/app/core/models/response.model';
import { UserClient } from 'src/app/core/models/user-client.model';
import { CarritoService } from 'src/app/core/services/carrito.service';
import { ClientService } from 'src/app/core/services/client.service';
import { LocalStorageService } from 'src/app/core/services/local-storage.service';
import { MapBoxService } from 'src/app/core/services/mapbox.service';
import { OrderService } from 'src/app/core/services/order.service';
import { AlertService } from 'src/app/shared/components/alert/alert.service';
import Swal from 'sweetalert2';
declare var tns;


@Component({
    selector: 'app-pedido',
    templateUrl: 'pedido.component.html',
    styleUrls: ['./pedido.component.scss']
})

export class PedidoComponent implements OnInit {

    lCarrito: Product[] = []
    user: UserClient
    formPedido: FormGroup
    tipoDocumento: string
    openModal: number = 0

    constructor(
        private _alertService: AlertService,
        private _carritoService: CarritoService,
        private _clientService: ClientService,
        private _formBuilder: FormBuilder,
        private _orderService: OrderService,
        private _localStorage: LocalStorageService,
        private _router: Router
    ) { }

    ngOnInit() {
        this.crearFormPedido()
        this.observableCarrito()
        this.getUserData()
        this.animationSlider()
    }

    observableCarrito() {
        this._localStorage.watch('Carrito').subscribe(
            (result) => {
                if (result) {
                    this.lCarrito = result
                }
                else {
                    this.lCarrito
                }
            }
        )
    }

    crearFormPedido() {
        this.formPedido = this._formBuilder.group({
            typeDocumentId: [null, []],
            numberDocument: [null, [Validators.required]],
            name: [null, [Validators.required]],
            area: [null, [Validators.required]],
            phone: [null, [Validators.required]],
            email: [null, [Validators.required, Validators.email]],
            address: [null, [Validators.required]],
            userName: [null, []],
            comments: [null, [Validators.required]],
        })
    }

    getCarrito() {
        this.lCarrito = this._carritoService.getCarrito()
    }

    getUserDataStorage() {
        let userData = JSON.parse(localStorage.getItem('Usuario'))
        if (userData) {
            this.user = userData.data
            this.formPedido.controls['userName'].setValue(this.user.name)
            this.tipoDocumento = this.user.client.typeDocument
        }
    }

    async getUserData() {
        try {
            const data: ResponseData = await this._clientService.getClientUser().toPromise()
            this.getUserDataStorage()
            this.formPedido.patchValue(data.data)
        }

        catch (error) {
            console.log("Error: ", error)
        }
    }

    async registrarPedido() {

        if (this.formPedido.invalid) {

            let contenido: Alert = {
                type: 'alert',
                contenido: 'Debe completar los datos requeridos'
            }

            this._alertService.open(contenido)
            this.formPedido.markAllAsTouched()
            return
        }

        let form = this.formPedido.value

        let Pedido: RegisterOrder = {
            userId: this.user.id,
            comments: form.comments,
            address: form.address,
            orderDetail: this.lCarrito.map(item => { return { idProduct: item.id, quantity: item.quantity } })
        }

        try {
            let data = await this._orderService.registrarPedido(Pedido)

            let contenido: Alert = {
                type: 'success',
                contenido: data.message
            }

            this._alertService.open(contenido)
        }

        catch (error) {
            console.log(error)
        }

    }

    setAddress(address: string) {
        this.formPedido.controls['address'].setValue(address)
    }

    getMontoTotal() {
        let montoTotal = this._carritoService.getMontoTotal(this.lCarrito)
        return montoTotal
    }

    getSubTotal() {
        let subTotal = this.getMontoTotal() - (this.getMontoTotal() * 0.18)
        return subTotal
    }

    animationSlider() {
        setTimeout(() => {

            // Hero Slider
            tns({
                container: '.tns-carousel-inner',
                controlsText: ['<i class="ci-arrow-left"></i>', '<i class="ci-arrow-right"></i>'],
                nav: false,
                gutter: 15,
                loop: false
            });
        }, 500);
    }

    cssValidate(control: string) {
        if (this.formPedido.controls[control].touched) {
            if (this.formPedido.controls[control].errors) return 'invalid'
            else return 'valid'
        }
        else return ''
    }

}

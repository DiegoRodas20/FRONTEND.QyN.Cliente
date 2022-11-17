import { Component, HostListener, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Alert } from 'src/app/core/models/alert.model';
import { UserClient } from 'src/app/core/models/user-client.model';
import { LocalStorageService } from 'src/app/core/services/local-storage.service';
import { OrderService } from 'src/app/core/services/order.service';
import { AlertService } from '../alert/alert.service';


@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss']
})

export class HeaderComponent implements OnInit {

    cantidadProductos: number
    openModal: number = 1
    formOrder: FormGroup

    // Account Session Client
    user: UserClient

    constructor(
        private _router: Router,
        private _localStorage: LocalStorageService,
        private _formBuilder: FormBuilder,
        private _alertService: AlertService,
        private _orderService: OrderService
    ) { }

    ngOnInit() {
        this.crearFormOrder()
        this.openSignInModal()
        this.observableCarrito()
        this.getUserData()
    }

    getUserData() {
        let userData = JSON.parse(localStorage.getItem('Usuario'))
        if (userData) {
            this.user = userData.data
        }
    }

    observableCarrito() {
        this._localStorage.watch('Carrito').subscribe(
            (result) => {
                if (result) {
                    this.cantidadProductos = result.length
                }
                else {
                    this.cantidadProductos = 0
                }
            }
        )
    }

    crearFormOrder() {
        this.formOrder = this._formBuilder.group({
            codigoOrder: [null, [Validators.required]]
        })
    }


    async getHistorialPedido() {

        if (this.formOrder.invalid) {

            let contenido: Alert = {
                type: 'alert',
                contenido: 'Formato inválido, revise los campos porfavor.'
            }
            this._alertService.open(contenido)
            this.formOrder.markAllAsTouched()
            return
        }

        let form = this.formOrder.value

        try {
            const data: any = await this._orderService.getOrderHistory(form.codigoOrder)

            let contenido: Alert = {
                type: 'success',
                contenido: data.message
            }
            this._alertService.open(contenido)
            this.gotoOrderTracking(form.codigoOrder)
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

    gotoCatalogo() {
        this._router.navigate(['/catalogo']).then(() => {
            window.location.reload();
        })
    }

    gotoHome() {
        this._router.navigate(['/home']).then(() => {
            window.location.reload();
        })
    }

    gotoProfile() {
        this._router.navigate(['/micuenta']).then(() => {
            window.location.reload();
        })
    }

    gotoOrderTracking(idOrder: number) {
        this._router.navigate([`/order-tracking/${idOrder}`]).then(() => {
            window.location.reload();
        })
    }

    openSignInModal() {
        this.openModal = 1
    }

    closeModalAuth(modalAuth: number) {
        this.openModal = modalAuth
    }

    cerrarSesion() {
        localStorage.clear()
        this.gotoHome()
    }

    cssValidate(control: string) {
        if (this.formOrder.controls[control].touched) {
            if (this.formOrder.controls[control].errors) return 'invalid'
            else return 'valid'
        }
        else return ''
    }
}
import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Alert } from 'src/app/core/models/alert.model';
import { UpdateClient } from 'src/app/core/models/client.model';
import { ResponseData } from 'src/app/core/models/response.model';
import { UserClient } from 'src/app/core/models/user-client.model';
import { ClientService } from 'src/app/core/services/client.service';
import { AlertService } from 'src/app/shared/components/alert/alert.service';


@Component({
    selector: 'app-miperfil',
    templateUrl: './miperfil.component.html'
})

export class MiPerfilComponent implements OnInit {

    user: UserClient
    formCliente: FormGroup
    tipoDocumento: string

    constructor(
        private _router: Router,
        private _formBuilder: FormBuilder,
        private _clientService: ClientService,
        private _alertService: AlertService
    ) { }

    ngOnInit() {
        this.crearFormCliente()
        this.getUserData()
    }

    crearFormCliente() {
        this.formCliente = this._formBuilder.group({
            id: [null, [Validators.required]],
            typeDocumentId: [null, []],
            numberDocument: [null, [Validators.required]],
            name: [null, [Validators.required]],
            area: [null, [Validators.required]],
            phone: [null, [Validators.required]],
            email: [null, [Validators.required, Validators.email]],
            address: [null, [Validators.required]],
            userName: [null, []],
        })
    }

    getUserDataStorage() {
        let userData = JSON.parse(localStorage.getItem('Usuario'))
        if (userData) {
            this.user = userData.data
            this.formCliente.controls['userName'].setValue(this.user.name)
            this.tipoDocumento = this.user.client.typeDocument
        }
    }

    async getUserData() {
        try {
            const data: ResponseData = await this._clientService.getClientUser().toPromise()
            this.getUserDataStorage()
            this.formCliente.patchValue(data.data)
        }

        catch (error) {
            console.log("Error: ", error)
        }
    }

    async actualizarCliente() {

        this.formCliente.markAllAsTouched()

        if (this.formCliente.invalid) {

            let contenido: Alert = {
                type: 'alert',
                contenido: 'Formato inválido, revise los campos porfavor.'
            }
            this._alertService.open(contenido)
            return
        }

        let form = this.formCliente.value

        let cliente: UpdateClient = {
            id: form.id,
            typeDocumentId: form.typeDocumentId,
            numberDocument: form.numberDocument,
            name: form.name,
            area: form.area,
            phone: form.phone,
            email: form.email,
            address: form.address
        }

        try {
            const data: ResponseData = await this._clientService.actualizarCliente(form.id, cliente)

            let contenido: Alert = {
                type: 'success',
                contenido: data.message
            }
            this._alertService.open(contenido)
            this.formCliente.reset()
            this.getUserData()
        }

        catch (error) {
            let contenido: Alert = {
                type: 'error',
                contenido: error.error.error
            }
            this._alertService.open(contenido)
        }
    }

    cssValidate(control: string) {
        if (this.formCliente.controls[control].touched) {
            if (this.formCliente.controls[control].errors) return 'invalid'
            else return 'valid'
        }
        else return ''
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

}
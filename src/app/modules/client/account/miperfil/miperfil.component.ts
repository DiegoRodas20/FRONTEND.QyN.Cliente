import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { ResponseData } from 'src/app/core/models/response.model';
import { UserClient } from 'src/app/core/models/user-client.model';
import { ClientService } from 'src/app/core/services/client.service';


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
    ) { }

    ngOnInit() {
        this.crearFormCliente()
        this.getUserData()
    }


    crearFormCliente() {
        this.formCliente = this._formBuilder.group({
            email: [null, []],
            numberDocument: [null, []],
            address: [null, []],
            name: [null, []]
        })
    }

    getUserDataPrueba() {
        let userData = JSON.parse(localStorage.getItem('Usuario'))
        console.log('DATA USUARIO', userData)
        if (userData) {
            this.user = userData.data
            this.formCliente.controls['name'].setValue(this.user.name)
            this.formCliente.patchValue(this.user.client)
            this.tipoDocumento = this.user.client.typeDocument
        }
    }

    async getUserData() {

        try {
            const data: ResponseData = await this._clientService.getClientUser().toPromise()

            console.log(data)
            // this.Mensaje = data.message
            // this.lCatalogo = data.data
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

}
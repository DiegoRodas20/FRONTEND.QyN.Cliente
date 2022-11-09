import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { UserClient } from 'src/app/core/models/user-client.model';


@Component({
    selector: 'app-perfil',
    templateUrl: './perfil.component.html'
})

export class PerfilComponent implements OnInit {

    user: UserClient
    formCliente: FormGroup
    tipoDocumento: string

    constructor(
        private _router: Router,
        private _formBuilder: FormBuilder
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

    getUserData() {
        let userData = JSON.parse(localStorage.getItem('Usuario'))
        console.log(userData)
        if (userData) {
            this.user = userData.data
            this.formCliente.controls['name'].setValue(this.user.name)
            this.formCliente.patchValue(this.user.client)
            this.tipoDocumento = this.user.client.typeDocument
        }
    }

    gotoOrdersxID() {

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
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { ResponseData } from 'src/app/core/models/response.model';
import { UserClient } from 'src/app/core/models/user-client.model';
import { ClientService } from 'src/app/core/services/client.service';
import { OrderService } from 'src/app/core/services/order.service';

@Component({
    selector: 'app-menu-perfil',
    templateUrl: './menu-perfil.component.html'
})

export class MenuPerfilComponent implements OnInit {

    user: UserClient
    PedidosCliente: any[] = []
    tipoDocumento: string

    constructor(
        private _router: Router,
    ) { }

    ngOnInit() {
        this.getUserData()
    }

    getUserData() {
        let userData = JSON.parse(localStorage.getItem('Usuario'))
        console.log(userData)
        if (userData) {
            this.user = userData.data
            this.tipoDocumento = this.user.client.typeDocument
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
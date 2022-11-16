import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserClient } from 'src/app/core/models/user-client.model';

@Component({
    selector: 'app-menu-perfil',
    templateUrl: './menu-perfil.component.html'
})

export class MenuPerfilComponent implements OnInit {

    user: UserClient
    tipoDocumento: string

    // Opciones Menu
    optionMenu: number = 2

    constructor(
        private _router: Router,
    ) { }

    ngOnInit() {
        // this.gotoProfile()
        this.getUserData()
    }

    getUserData() {
        let userData = JSON.parse(localStorage.getItem('Usuario'))
        if (userData) {
            this.user = userData.data
            this.tipoDocumento = this.user.client.typeDocument
        }
    }

    gotoProfile() {
        this.optionMenu = 1
    }

    gotoOrders() {
        this.optionMenu = 2
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
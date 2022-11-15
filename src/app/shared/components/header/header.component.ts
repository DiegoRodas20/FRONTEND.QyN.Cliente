import { Component, HostListener, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserClient } from 'src/app/core/models/user-client.model';
import { LocalStorageService } from 'src/app/core/services/local-storage.service';


@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss']
})

export class HeaderComponent implements OnInit {

    cantidadProductos: number

    // Modal Auth
    openSignIn: boolean = true
    openSignUp: boolean = false

    // Account Session Client
    user: UserClient

    constructor(
        private _router: Router,
        private _localStorage: LocalStorageService,
    ) { }

    ngOnInit() {
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

    closeModalAuth(modalAuth: boolean) {
        this.openSignIn = modalAuth
        this.openSignUp = !modalAuth
    }

    cerrarSesion() {
        localStorage.clear()
        this.gotoHome()
    }
}
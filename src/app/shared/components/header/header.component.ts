import { Component, HostListener, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LocalStorageService } from 'src/app/core/services/local-storage.service';


@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss']
})

export class HeaderComponent implements OnInit {

    cantidadProductos: number
    openSignIn: boolean = true
    openSignUp: boolean = false

    constructor(
        private _router: Router,
        private _localStorage: LocalStorageService,
    ) { }

    ngOnInit() {
        this._localStorage.watch('Carrito').subscribe(
            (result) => {
                if (result) {
                    this.cantidadProductos = JSON.parse(result).length
                    console.log(JSON.parse(result))
                }
                else {
                    this.cantidadProductos = 0
                }
            }
        )
    }

    gotoCatalogo() {
        this._router.navigate(['/catalogo'])
    }

    gotoHome() {
        this._router.navigate(['/home'])
    }

    gotoPedido() {
        this._router.navigate(['/pedido'])
    }

    modalAuth(modalAuth: boolean) {
        this.openSignIn = modalAuth
        this.openSignUp = !modalAuth
    }
}
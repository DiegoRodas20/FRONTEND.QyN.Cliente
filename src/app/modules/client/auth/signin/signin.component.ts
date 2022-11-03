import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { SignIn } from 'src/app/core/models/auth.model';
import { ResponseData } from 'src/app/core/models/response.model';
import { AuthService } from 'src/app/core/services/auth.service';


@Component({
    selector: 'app-signin',
    templateUrl: './signin.component.html'
})

export class SignInComponent implements OnInit {

    @Input() open: boolean
    @Output() close = new EventEmitter<boolean>();

    hidePassword: boolean = true
    formSignIn: FormGroup

    // Alert Modal
    typeModal: string
    openModal: boolean = false
    contenidoModal: string

    constructor(
        private _router: Router,
        private _formBuilder: FormBuilder,
        private _authService: AuthService
    ) { }

    ngOnInit() {
        this.crearFormSignIn()
    }

    crearFormSignIn() {
        this.formSignIn = this._formBuilder.group({
            userName: [null, [Validators.required]],
            password: [null, [Validators.required]],
        })
    }

    async iniciarSesion() {

        if (this.formSignIn.invalid) {

            let contenido: any = {
                type: 'alert',
                text: 'Formato inválido, revise los campos porfavor.'
            }
            this.onOpenAlert(contenido)
            return
        }

        let form = this.formSignIn.value

        let signin: SignIn = {
            userName: form.userName,
            password: form.password
        }

        try {
            const data: any = await this._authService.iniciarSesion(signin)

            if (!data.body.error) {

                const token = data.headers.get('authorization')
                const usuario = atob(data.headers.get('authorization').split('.')[1])

                localStorage.setItem('Usuario', usuario)
                localStorage.setItem('Token', token)

                let contenido: any = {
                    type: 'success',
                    text: data.body.message
                }

                this.onOpenAlert(contenido)
            }
        }

        catch (error) {
            let contenido: any = {
                type: 'error',
                text: error.error.error
            }

            this.onOpenAlert(contenido)
        }
    }

    onOpenAlert(contenido: any) {
        this.openModal = true
        this.typeModal = contenido.type
        this.contenidoModal = contenido.text
    }

    onCloseAlert(event: boolean) {
        this.openModal = event

        if (this.typeModal == 'success') {
            this._router.navigate(['/catalogo']).then(() => {
                window.location.reload();
            })
        }
    }

    onCloseModal() {
        this.open = false
        this.close.emit(this.open)
    }
}
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Alert } from 'src/app/core/models/alert.model';
import { SignIn } from 'src/app/core/models/auth.model';
import { ResponseData } from 'src/app/core/models/response.model';
import { AuthService } from 'src/app/core/services/auth.service';
import { alertAnimation } from 'src/app/shared/components/alert/alert.animation';
import { AlertService } from 'src/app/shared/components/alert/alert.service';


@Component({
    selector: 'app-signin',
    templateUrl: './signin.component.html'
})

export class SignInComponent implements OnInit {

    @Output() close = new EventEmitter<number>();

    hidePassword: boolean = true
    formSignIn: FormGroup

    constructor(
        private _router: Router,
        private _formBuilder: FormBuilder,
        private _authService: AuthService,
        private _alertService: AlertService
    ) { }

    ngOnInit() {
        this.crearFormSignIn()
    }

    crearFormSignIn() {
        this.formSignIn = this._formBuilder.group({
            userName: [null, [Validators.required, Validators.email]],
            password: [null, [Validators.required]],
        })
    }

    async iniciarSesion() {

        if (this.formSignIn.invalid) {

            let contenido: Alert = {
                type: 'alert',
                contenido: 'Formato inválido, revise los campos porfavor.'
            }
            this._alertService.open(contenido)
            this.formSignIn.markAllAsTouched()
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

                let contenido: Alert = {
                    type: 'success',
                    contenido: data.body.message
                }
                this._alertService.open(contenido)
                
                this._router.navigate(['/catalogo']).then(() => {
                    window.location.reload();
                })
            }
        }

        catch (error) {
            let contenido: Alert = {
                type: 'error',
                contenido: error.error.error
            }
            this._alertService.open(contenido)
        }
    }

    onCloseModal() {
        this.formSignIn.reset()
    }

    openChangePasswordModal() {
        this.close.emit(3)
    }

    openSignupModal() {
        this.close.emit(2)
    }

    cssValidate(control: string) {
        if (this.formSignIn.controls[control].touched) {
            if (this.formSignIn.controls[control].errors) return 'invalid'
            else return 'valid'
        }
        else return ''
    }
}
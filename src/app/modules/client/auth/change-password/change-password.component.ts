import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Alert } from 'src/app/core/models/alert.model';
import { AuthService } from 'src/app/core/services/auth.service';
import { AlertService } from 'src/app/shared/components/alert/alert.service';


@Component({
    selector: 'app-change-password',
    templateUrl: './change-password.component.html'
})

export class ChangePasswordComponent implements OnInit {

    @Output() close = new EventEmitter<number>();

    hidePassword: boolean = true
    formChangePassword: FormGroup
    changePasswordActive: boolean = false
    email: string

    constructor(
        private _formBuilder: FormBuilder,
        private _authService: AuthService,
        private _alertService: AlertService,
        private _router: Router,
    ) { }

    ngOnInit() {
        this.crearFormChangePassword()
    }

    crearFormChangePassword() {
        this.formChangePassword = this._formBuilder.group({
            userName: [null, [Validators.required, Validators.email]],
            password: [null],
            token: [null],
        })
    }

    async changePasswordRequest() {

        if (this.formChangePassword.invalid) {

            let contenido: Alert = {
                type: 'alert',
                contenido: 'Formato inválido, revise los campos porfavor.'
            }
            this._alertService.open(contenido)
            this.formChangePassword.markAllAsTouched()
            return
        }

        let form = this.formChangePassword.value

        let changePassword: any = {
            userName: form.userName
        }

        this.email = changePassword.userName

        try {
            const data: any = await this._authService.changePasswordRequest(changePassword)

            console.log(data)

            let contenido: Alert = {
                type: 'success',
                contenido: data.data
            }
            this._alertService.open(contenido)

            this.formChangePassword.controls['userName'].clearValidators()
            this.formChangePassword.controls['password'].addValidators([Validators.required])
            this.formChangePassword.controls['token'].addValidators([Validators.required])
            this.changePasswordActive = true
            this.formChangePassword.updateValueAndValidity()
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

    async changePasswordUpdate() {
        if (this.formChangePassword.invalid) {

            let contenido: Alert = {
                type: 'alert',
                contenido: 'Formato inválido, revise los campos porfavor.'
            }
            this._alertService.open(contenido)
            this.formChangePassword.markAllAsTouched()
            return
        }

        let form = this.formChangePassword.value

        let changePasswordUpdate: any = {
            email: this.email,
            password: form.password,
            token: form.token
        }

        try {
            const data: any = await this._authService.changePasswordUpdate(changePasswordUpdate)
            console.log(data)
            let contenido: Alert = {
                type: 'success',
                contenido: data.message
            }
            this._alertService.open(contenido)
            
            setTimeout(() => {
                this._router.navigate(['/catalogo']).then(() => {
                    window.location.reload();
                })
            }, 2000);
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

    openSigninModal() {
        this.close.emit(1)
    }

    onCloseModal() {
        this.formChangePassword.reset()
    }

    cssValidate(control: string) {
        if (this.formChangePassword.controls[control].touched) {
            if (this.formChangePassword.controls[control].errors) return 'invalid'
            else return 'valid'
        }
        else return ''
    }

}
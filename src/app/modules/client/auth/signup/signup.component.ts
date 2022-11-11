import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Alert } from 'src/app/core/models/alert.model';
import { SignIn, SignUp } from 'src/app/core/models/auth.model';
import { ResponseData } from 'src/app/core/models/response.model';
import { TypeDocument } from 'src/app/core/models/typedocument.model';
import { AuthService } from 'src/app/core/services/auth.service';
import { TypeDocumentService } from 'src/app/core/services/typedocument.service';
import { AlertService } from 'src/app/shared/components/alert/alert.service';


@Component({
    selector: 'app-signup',
    templateUrl: './signup.component.html'
})

export class SignUpComponent implements OnInit {

    @Input() open: boolean
    @Output() close = new EventEmitter<boolean>();

    hidePassword: boolean = true
    formSignUp: FormGroup
    lTypeDocument: TypeDocument[] = []

    constructor(
        private _router: Router,
        private _formBuilder: FormBuilder,
        private _typedocumentService: TypeDocumentService,
        private _authService: AuthService,
        private _alertService: AlertService
    ) { }

    ngOnInit() {
        this.crearFormSignUp()
        this.listarTypeDocument()
    }

    crearFormSignUp() {
        this.formSignUp = this._formBuilder.group({
            email: [null, [Validators.required, Validators.email]],
            password: [null, [Validators.required]],
            typeDocumentId: [null, [Validators.required]],
            numberDocument: [null, [Validators.required]],
            companyName: [null, [Validators.required]],
            phone: [null, [Validators.required]],
            address: [null, [Validators.required]],
            firstName: [null, [Validators.required]],
            lastName: [null, [Validators.required]],
            surName: [null, [Validators.required]],
            bornDate: [null, [Validators.required]]
        })
    }

    async listarTypeDocument() {
        try {
            const data: ResponseData = await this._typedocumentService.getTypeDocument().toPromise()
            this.lTypeDocument = data.data
        }
        catch (error) {
            console.log("Error: ", error)
        }
    }

    async registrarCliente() {

        if (this.formSignUp.invalid) {

            let contenido: Alert = {
                type: 'alert',
                contenido: 'Formato inválido, revise los campos porfavor.'
            }
            this._alertService.open(contenido)
            this.formSignUp.markAllAsTouched()
            return
        }

        let form = this.formSignUp.value

        let signup: SignUp = {
            email: form.email,
            password: form.password,
            typeDocumentId: Number(form.typeDocumentId),
            numberDocument: form.numberDocument,
            companyName: form.companyName,
            phone: form.phone,
            address: form.address,
            firstName: form.firstName,
            lastName: form.lastName,
            surName: form.surName,
            bornDate: (form.bornDate)
        }

        try {
            const data: any = await this._authService.registrarCliente(signup)

            if (!data.body.error) {

                let contenido: Alert = {
                    type: 'success',
                    contenido: data.body.message
                }
                this._alertService.open(contenido)
                this.iniciarSesion()
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

    async iniciarSesion() {

        let form = this.formSignUp.value

        let signin: SignIn = {
            userName: form.email,
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

    onOpenSigninModal() {
        this.open = false
        this.close.emit(this.open)
    }

    onCloseModal() {
        this.formSignUp.reset()
    }

    cssValidate(control: string) {
        if (this.formSignUp.controls[control].touched) {
            if (this.formSignUp.controls[control].errors) return 'invalid'
            else return 'valid'
        }
        else return ''
    }
}
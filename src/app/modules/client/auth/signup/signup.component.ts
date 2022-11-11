import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { SignIn, SignUp } from 'src/app/core/models/auth.model';
import { ResponseData } from 'src/app/core/models/response.model';
import { TypeDocument } from 'src/app/core/models/typedocument.model';
import { AuthService } from 'src/app/core/services/auth.service';
import { TypeDocumentService } from 'src/app/core/services/typedocument.service';


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

    // Alert Modal
    typeModal: string
    openModal: boolean = false
    contenidoModal: string

    constructor(
        private _router: Router,
        private _formBuilder: FormBuilder,
        private _typedocumentService: TypeDocumentService,
        private _authService: AuthService
    ) { }

    ngOnInit() {
        this.crearFormSignUp()
        this.listarTypeDocument()
    }

    crearFormSignUp() {
        this.formSignUp = this._formBuilder.group({
            email: [null, []],
            password: [null, []],
            typeDocumentId: [null, []],
            numberDocument: [null, []],
            companyName: [null, []],
            phone: [null, []],
            address: [null, []],
            firstName: [null, []],
            lastName: [null, []],
            surName: [null, []],
            bornDate: [null, []]
        })
    }

    async listarTypeDocument() {
        try {
            const data: ResponseData = await this._typedocumentService.getTypeDocument().toPromise()
            this.lTypeDocument = data.data

            console.log(data)
        }
        catch (error) {
            console.log("Error: ", error)
        }
    }

    async registrarCliente() {
        if (this.formSignUp.invalid) {

            let contenido: any = {
                type: 'alert',
                text: 'Formato inválido, revise los campos porfavor.'
            }
            this.onOpenAlert(contenido)
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

        console.log(signup)

        try {
            const data: any = await this._authService.registrarCliente(signup)

            console.log(data)
            if (!data.body.error) {

                let contenido: any = {
                    type: 'success',
                    text: data.body.message
                }

                this.onOpenAlert(contenido)
                this.iniciarSesion()
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

    onOpenSigninModal() {
        this.open = false
        this.close.emit(this.open)
    }

    onCloseModal() {
        this.formSignUp.reset()
    }
}
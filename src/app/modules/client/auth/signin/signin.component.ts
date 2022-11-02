import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
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

    formSignIn: FormGroup

    constructor(
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
            console.log('Formato invalido')
            return
        }

        let form = this.formSignIn.value

        let signin: SignIn = {
            userName: form.userName,
            password: form.password
        }

        try {
            const data: any = await this._authService.iniciarSesion(signin)
            console.log(data.headers.get('authorization'))
            console.log(atob(data.headers.get('authorization').split('.')[1]))
   
        }

        catch (error) {
            console.log(error)
        }
    }

    onClose() {
        this.open = false
        this.close.emit(this.open)
    }
}
import { Injectable } from "@angular/core"
import { HttpClient } from '@angular/common/http';
import { AUTH_URL } from "../utils/url_constants";
import { SignIn, SignUp } from "../models/auth.model";
import { ResponseData } from "../models/response.model";


@Injectable({
    providedIn: 'root'
})

export class AuthService {

    constructor(
        private http: HttpClient
    ) { }

    // Iniciar Sesion
    iniciarSesion(signin: SignIn): Promise<any> {

        const url = `${AUTH_URL}login`
        return this.http.post<any>(url, signin, { observe: 'response' }).toPromise()
    }

    // Registrar Cliente
    registrarCliente(signup: SignUp): Promise<any> {

        const url = `${AUTH_URL}signin`
        return this.http.post<any>(url, signup, { observe: 'response' }).toPromise()
    }

    // Recuperar Contraseña
    changePasswordRequest(email: string): Promise<any> {

        const url = `${AUTH_URL}changePassword/request`
        return this.http.post<any>(url, email).toPromise()
    }

    changePasswordUpdate(changePasswordBody: any): Promise<any> {

        const url = `${AUTH_URL}changePassword/${changePasswordBody.token}`
        return this.http.put<any>(url, changePasswordBody).toPromise()
    }

}
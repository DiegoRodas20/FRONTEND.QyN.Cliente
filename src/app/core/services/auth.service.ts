import { Injectable } from "@angular/core"
import { HttpClient } from '@angular/common/http';
import { AUTH_URL } from "../utils/url_constants";
import { SignIn, SignUp } from "../models/auth.model";
import { ResponseData } from "../models/response.model";
import { getState, TOKEN_KEY } from "../utils/storage";
import { JwtHelperService } from "@auth0/angular-jwt";
import { Observable } from "rxjs";
import { BaseService } from "./base.service";

const jwtHelper = new JwtHelperService();

@Injectable({
    providedIn: 'root'
})

export class AuthService extends BaseService {

    constructor(
        private http: HttpClient
    ) { super() }

    public isAuthenticated(): boolean {
        const token = getState(TOKEN_KEY);
        if (!!token) return !jwtHelper.isTokenExpired(token);
        return false;
    }

    // Iniciar Sesion
    iniciarSesion(signin: SignIn): Promise<any> {

        const options = {
            headers: this.obtenerHeaders(),
            observe: "response" as 'body', // to display the full response & as 'body' for type cast
            responseType: "json"
        };

        const url = `${AUTH_URL}login`
        return this.http.post<any>(url, signin, { headers: this.obtenerHeaders(), observe: 'response' }).toPromise()
    }

    // Registrar Cliente
    registrarCliente(signup: SignUp): Promise<ResponseData> {

        const url = `${AUTH_URL}signin`
        return this.http.post<ResponseData>(url, signup).toPromise()
    }

}
import { Injectable } from "@angular/core"
import { HttpClient } from '@angular/common/http';
import { Observable } from "rxjs";
import { CLIENT_URL } from "../utils/url_constants";
import { ResponseData } from "../models/response.model";
import { UpdateClient } from "../models/client.model";

@Injectable({
    providedIn: 'root'
})

export class ClientService {

    constructor(private http: HttpClient) { }

    // Datos de cliente Usuario
    getClientUser(): Observable<ResponseData> {
        const url = `${CLIENT_URL}/user`
        return this.http.get<ResponseData>(url)
    }

    // Actualizar Cliente
    actualizarCliente(idCliente: string, cliente: UpdateClient): Promise<ResponseData> {

        const url = `${CLIENT_URL}/${idCliente}`
        return this.http.put<ResponseData>(url, cliente).toPromise()
    }

}
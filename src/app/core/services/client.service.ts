import { Injectable } from "@angular/core"
import { HttpClient } from '@angular/common/http';
import { Observable } from "rxjs";
import { CLIENT_URL } from "../utils/url_constants";
import { ResponseData } from "../models/response.model";

@Injectable({
    providedIn: 'root'
})

export class ClientService {

    constructor(private http: HttpClient) { }
    
    // Cliente Usuario
    getClientUser(): Observable<ResponseData> {
        const url = `${CLIENT_URL}`
        return this.http.get<ResponseData>(url)
    }

}
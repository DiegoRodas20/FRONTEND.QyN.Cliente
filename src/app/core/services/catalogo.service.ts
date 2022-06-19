import { Injectable } from "@angular/core"
import { HttpClient } from '@angular/common/http';
import { Observable } from "rxjs";
import { CATALOGO_URL } from "../utils/url_constants";

@Injectable({
    providedIn: 'root'
})

export class CatalogoService {

    constructor(private http: HttpClient) { }

    // Listado general de Catalogo de Productos
    getCatalogo(): Observable<any> {

        const url = `${CATALOGO_URL}`
        return this.http.get(url)
    }

}
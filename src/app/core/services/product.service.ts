import { Injectable } from "@angular/core"
import { Observable } from "rxjs";
import { HttpClient } from '@angular/common/http';
import { PRODUCT_URL } from "../utils/url_constants";
import { ResponseData } from "../models/response.model";


@Injectable({
    providedIn: 'root'
})

export class ProductService {

    constructor(
        private http: HttpClient
    ) { }

    // Listado de productos catalogo
    getProductos(): Observable<ResponseData> {

        const url = `${PRODUCT_URL}/catalog`
        return this.http.get<ResponseData>(url)
    }

}
import { Injectable } from "@angular/core"
import { HttpClient } from '@angular/common/http';
import { Observable } from "rxjs";
import { TYPEDOCUMENT_URL } from "../utils/url_constants";
import { ResponseData } from "../models/response.model";

@Injectable({
    providedIn: 'root'
})

export class TypeDocumentService {

    constructor(private http: HttpClient) { }

    // Listado general de tipos de documento
    getTypeDocument(): Observable<ResponseData> {

        const url = `${TYPEDOCUMENT_URL}`
        return this.http.get<ResponseData>(url)
    }

}
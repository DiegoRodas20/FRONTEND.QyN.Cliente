import { Injectable } from "@angular/core"
import { HttpClient } from '@angular/common/http';
import { Observable } from "rxjs";
import { CATEGORY_URL } from "../utils/url_constants";
import { ResponseData } from "../models/response.model";

@Injectable({
    providedIn: 'root'
})

export class CategoryService {

    constructor(private http: HttpClient) { }

    getCategory(): Observable<ResponseData> {

        const url = `${CATEGORY_URL}`
        return this.http.get<ResponseData>(url)
    }
}
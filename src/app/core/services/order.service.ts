import { Injectable } from "@angular/core"
import { HttpClient } from '@angular/common/http';
import { ORDER_URL } from "../utils/url_constants";
import { RegisterOrder } from "src/app/core/models/order.model";
import { Observable } from "rxjs";
import { ResponseData } from "../models/response.model";

@Injectable({
    providedIn: 'root'
})

export class OrderService {

    constructor(
        private http: HttpClient
    ) { }

    // Registrar Pedido
    registrarPedido(order: RegisterOrder): Promise<ResponseData> {

        const url = `${ORDER_URL}/client`
        return this.http.post<ResponseData>(url, order).toPromise()
    }

    getPedidosxCliente(): Observable<ResponseData> {
        const url = `${ORDER_URL}/client`
        return this.http.get<ResponseData>(url)
    }

}
import { Injectable } from "@angular/core"
import { HttpClient } from '@angular/common/http';
import { ORDER_URL } from "../utils/url_constants";
import { RegisterOrder } from "src/app/core/models/order.model";

@Injectable({
    providedIn: 'root'
})

export class OrderService {

    constructor(
        private http: HttpClient
    ) { }

    // Registrar Pedido
    registrarPedido(order: RegisterOrder): Promise<Response> {

        const url = `${ORDER_URL}/client`
        return this.http.post<Response>(url, order).toPromise()
    }

}
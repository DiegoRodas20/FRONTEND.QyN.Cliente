import { Injectable } from "@angular/core"
import { HttpClient } from '@angular/common/http';
import { Observable } from "rxjs";
import { PEDIDO_URL } from "../utils/url_constants";
import { Pedido } from "src/app/shared/models/pedido.model";

@Injectable({
    providedIn: 'root'
})

export class PedidoService {

    constructor(
        private http: HttpClient
    ) { }

    // Registrar Pedido
    registrarPedido(pedido: Pedido): Promise<any> {

        const url = `${PEDIDO_URL}`

        return this.http.post<any>(url, pedido).toPromise()
    }

}
import { Injectable } from "@angular/core";
import { Alert } from "src/app/core/models/alert.model";

@Injectable({
    providedIn: 'root'
})

export class AlertService {

    private _opened: boolean
    private _type: string
    private _contenido: string

    constructor() {
        this._opened = false
        this._type = ''
        this._contenido = ''
    }

    open(content: Alert) {
        this._opened = true
        this._type = content.type
        this._contenido = content.contenido
    }

    close() {
        this._opened = false
    }

    get opened() {
        return this._opened
    }

    get typeModal() {
        return this._type
    }

    get contenidoModal() {
        return this._contenido
    }

}
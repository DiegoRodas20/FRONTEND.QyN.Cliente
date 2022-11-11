import { Injectable } from "@angular/core";

@Injectable({
    providedIn: 'root'
})

export class LoaderService {

    private _opened: boolean

    constructor() {
        this._opened = true
    }

    open() {
        this._opened = true
    }

    close() {
        this._opened = false
    }

    get opened() {
        return this._opened
    }

}
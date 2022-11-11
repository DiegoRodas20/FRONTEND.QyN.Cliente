import { HttpErrorResponse, HttpHandler, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { throwError } from "rxjs";
import { catchError } from "rxjs/operators";
import { AlertService } from "src/app/shared/components/alert/alert.service";
import { Alert } from "../models/alert.model";

@Injectable({
    providedIn: 'root'
})

export class ErrorInterceptorService {

    constructor(
        private _alertService: AlertService
    ) { }

    intercept(req: HttpRequest<any>, next: HttpHandler) {

        return next.handle(req).pipe(
            catchError((error: HttpErrorResponse) => {
                
                if (error && error.error && error.error.error) {
                    let mensajeError = ""

                    for (let i of error.error.error) {
                        mensajeError += `• ${i}\n`
                    }

                    let contenido: Alert = {
                        type: 'error',
                        contenido: mensajeError
                    }

                    this._alertService.open(contenido)
                }
                return throwError(error)
            })
        )
    }
}
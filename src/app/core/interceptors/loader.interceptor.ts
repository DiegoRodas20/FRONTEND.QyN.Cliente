import { HttpEvent, HttpHandler, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { catchError, finalize } from "rxjs/operators";
import { LoaderService } from "src/app/shared/components/loader/loader.service";


@Injectable({
    providedIn: 'root'
})

export class LoaderInterceptorService {

    constructor(
        private _loaderService: LoaderService
    ) { }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

        this._loaderService.open()
        return next.handle(req).pipe(
            finalize(() => this._loaderService.close())
        )
    }
}
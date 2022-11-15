import { HttpRequest, HttpHandler, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})

export class AuthInterceptor {

    constructor(
        private router: Router
    ) { }

    intercept(req: HttpRequest<any>, next: HttpHandler) {

        const token: string = localStorage.getItem('Token'); // This retrieves a token from local storage
        req = req.clone({ headers: req.headers.set('Authorization', 'Bearer ' + token) });// This clones HttpRequest and Authorization header with Bearer token added
        req = req.clone({ headers: req.headers.set('Content-Type', 'application/json') });
        req = req.clone({ headers: req.headers.set('Accept', 'application/json') });

        return next.handle(req)
            .pipe();
    }
}

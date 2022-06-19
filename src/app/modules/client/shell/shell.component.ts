import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
    selector: 'app-shell',
    templateUrl: 'shell.component.html'
})

export class ShellComponent implements OnInit {

    estado: string = 'active'

    constructor(
        private _router: Router
    ) {
        this.preloader()
    }

    ngOnInit() { }

    preloader() {

        this._router.events.subscribe(
            events => {

                this.estado = 'active'

                setTimeout(() => {
                    this.estado = ''
                }, 2000)

            });

    }
}
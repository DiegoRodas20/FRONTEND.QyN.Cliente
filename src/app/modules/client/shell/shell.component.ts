import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
    selector: 'app-shell',
    templateUrl: 'shell.component.html'
})

export class ShellComponent implements OnInit {

    openloader: boolean

    constructor(
        private _router: Router
    ) { }

    ngOnInit() {
        this.preloader()
    }

    preloader() {

        this._router.events.subscribe(
            () => {

                this.openloader = true

                setTimeout(() => {
                    this.openloader = false
                }, 2000)

            });

    }
}
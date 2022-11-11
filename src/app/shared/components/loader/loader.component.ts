import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NavigationEnd, NavigationStart, Router } from '@angular/router';
import { loaderAnimation } from './loader.animation';


@Component({
    selector: 'app-loader',
    templateUrl: './loader.component.html',
    styleUrls: ['./loader.component.scss'],
    animations: [loaderAnimation]
})

export class LoaderComponent implements OnInit {

    @Input() open: boolean
    @Output() close = new EventEmitter<boolean>();

    constructor(
        private _router: Router
    ) { }

    ngOnInit() {
        this._router.events.subscribe(event => {

            if (event instanceof NavigationStart) this.open = true

            setTimeout(() => {
                if (event instanceof NavigationEnd) this.close.emit(false)

            }, 2000)

        })
    }
}
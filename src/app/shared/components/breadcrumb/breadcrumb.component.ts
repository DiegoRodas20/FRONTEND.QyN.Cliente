import { Component, OnDestroy } from '@angular/core';
import { ActivatedRoute, ActivationEnd, Router } from '@angular/router';
import { filter, map } from 'rxjs/operators';
import { Subscription } from 'rxjs';

@Component({
    selector: 'app-breadcrumb',
    templateUrl: 'breadcrumb.component.html'
})

export class BreadcrumbComponent implements OnDestroy {

    titulo: string
    tituloSubscripcion: Subscription

    constructor(
        private router: Router
    ) {
        this.tituloSubscripcion = this.getArgumentosRuta().subscribe(({ titulo }) => {
            this.titulo = titulo
        })
    }

    ngOnDestroy() {
        this.tituloSubscripcion.unsubscribe()
    }

    getArgumentosRuta() {
        return this.router.events
            .pipe(
                filter(event => event instanceof ActivationEnd),
                filter((event: ActivationEnd) => event.snapshot.firstChild === null),
                map((event: ActivationEnd) => event.snapshot.data)
            )
    }
}
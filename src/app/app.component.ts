import { Component } from '@angular/core';
import { AlertService } from './shared/components/alert/alert.service';
import { LoaderService } from './shared/components/loader/loader.service';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})

export class AppComponent {
    title = 'FRONTEND.QyN.Cliente';

    constructor(
        public alertService: AlertService,
        public loaderService: LoaderService
    ) { }
}

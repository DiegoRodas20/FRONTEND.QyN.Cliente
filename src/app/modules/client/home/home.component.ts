import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
declare var tns;

@Component({
    selector: 'app-home',
    templateUrl: 'home.component.html',
    styleUrls: ['./home.component.scss']
})

export class HomeComponent implements OnInit {

    constructor(
        private _router: Router,
    ) { }

    ngOnInit() {
        this.animationSlider()
    }

    animationSlider() {
        setTimeout(() => {

            // Hero Slider
            tns({
                container: '.tns-carousel-inner',
                controlsText: ['<i class="ci-arrow-left"></i>', '<i class="ci-arrow-right"></i>'],
                mode: 'gallery',
                navContainer: '#pager',
                responsive: {
                    0: { controls: false },
                    991: { controls: true }
                }
            });
            
            // Instagram
            tns({
                container: '.tns-carousel-inner-seven',
                controls: false,
                gutter: 15,
                responsive: {
                    0: { items: 2 },
                    500: { items: 3 },
                    1200: { items: 3 }
                }

            });

        }, 500);
    }

    gotoCatalogo() {
        this._router.navigate(['/catalogo'])
    }

}
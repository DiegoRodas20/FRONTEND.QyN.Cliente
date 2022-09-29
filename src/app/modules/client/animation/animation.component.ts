import { Component, OnInit } from '@angular/core';
declare var TweenMax;

@Component({
    selector: 'app-animation',
    templateUrl: 'animation.component.html',
    styleUrls: ['./animation.component.scss']
})

export class AnimationComponent implements OnInit {

    constructor() { }

    ngOnInit() { 
        this.prueba()
    }


    prueba() {

        var url = "catalogo";

        // OVERLAY
        TweenMax.to(".capa", 1.5, {
            delay: .5,
            left: "-100%",
            ease: "Expo.easeInOut"
        });

        TweenMax.to(".capa", 1.5, {
            delay: 11,
            left: "0%",
            ease: "Expo.easeInOut",
            onComplete: function () {
                window.location.href = url;
            }
        });

    }
}
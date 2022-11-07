import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { alertAnimation } from './alert.animation';


@Component({
    selector: 'alert',
    templateUrl: 'alert.component.html',
    styleUrls: ['alert.component.scss'],
    animations: [alertAnimation]
})

export class AlertComponent implements OnInit {

    // Contenido modal
    @Input() type: string
    @Input() contenido: string

    @Input() open: boolean
    @Output() close = new EventEmitter<boolean>();

    constructor() { }

    ngOnInit() {
        this.timerClose()
    }

    timerClose() {
        setTimeout(() => {
            this.onClose()
        }, 6000)
    }

    onClose() {
        this.open = false
        this.close.emit(this.open)
    }

    colorAlert(typeAlert: string) {

        switch (typeAlert) {
            case 'success':
                return 'alert-success'
                break;
            case 'error':
                return 'alert-danger'
                break;
            case 'alert':
                return 'alert-warning'
                break;
            case 'info':
                return 'alert-dark'
                break;
            default:
                return ''
                break;
        }
    }

    iconAlert(typeAlert: string) {
        switch (typeAlert) {
            case 'success':
                return 'ci-check'
                break;
            case 'error':
                return 'ci-close-round'
                break;
            case 'alert':
                return 'ci-alert'
                break;
            case 'info':
                return 'ci-alert-octagon'
                break;
            default:
                return ''
                break;
        }
    }

    titleAlert(typeAlert: string) {
        switch (typeAlert) {
            case 'success':
                return 'Éxito'
                break;
            case 'error':
                return 'Error'
                break;
            case 'alert':
                return 'Atención'
                break;
            case 'info':
                return 'Información'
                break;
            default:
                return ''
                break;
        }
    }
}
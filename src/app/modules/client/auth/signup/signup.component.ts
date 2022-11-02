import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';


@Component({
    selector: 'app-signup',
    templateUrl: './signup.component.html'
})

export class SignUpComponent implements OnInit {

    @Input() open: boolean
    @Output() close = new EventEmitter<boolean>();

    constructor() { }

    ngOnInit() { }

    onClose() {
        this.open = false
        this.close.emit(this.open)
    }
}
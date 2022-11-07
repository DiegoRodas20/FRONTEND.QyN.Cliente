import { Component, Input, OnInit } from '@angular/core';
import { AbstractControl } from '@angular/forms';
import { errorAnimation } from './error-message.animation';


@Component({
    selector: 'error-message',
    templateUrl: './error-message.component.html',
    animations: [errorAnimation]
})

export class ErrorMessageComponent implements OnInit {

    @Input() formControlError: AbstractControl

    constructor() { }

    ngOnInit() { }
}
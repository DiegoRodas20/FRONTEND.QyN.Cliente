import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AbstractControl } from '@angular/forms';


@Component({
    selector: 'tooltip',
    templateUrl: './tooltip.component.html',
    // animations: [errorAnimation]
})

export class ToolTipComponent implements OnInit {

    @Input() contenido: string

    @Input() open: boolean
    @Output() close = new EventEmitter<boolean>();

    constructor() { }

    ngOnInit() { }
}
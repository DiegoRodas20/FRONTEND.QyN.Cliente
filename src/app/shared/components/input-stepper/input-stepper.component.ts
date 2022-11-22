import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl } from '@angular/forms';


@Component({
    selector: 'input-stepper',
    templateUrl: 'input-stepper.component.html',
    styleUrls: ['./input-stepper.component.scss']
})

export class InputStepperComponent implements OnInit {

    input = new FormControl({ value: 1, disabled: true })
    @Output() value = new EventEmitter<number>()

    constructor() { }

    ngOnInit() { }

    addValue(value: number) {
        let newValue = value + 1
        this.input.setValue(newValue)
        this.value.emit(newValue)
    }

    decreaseValue(value: number) {
        if (value == 1) return
        let newValue = value - 1
        this.input.setValue(newValue)
        this.value.emit(newValue)
    }
}
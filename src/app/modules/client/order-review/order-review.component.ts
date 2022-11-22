import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Alert } from 'src/app/core/models/alert.model';
import { OrderReview } from 'src/app/core/models/order.model';
import { OrderService } from 'src/app/core/services/order.service';
import { AlertService } from 'src/app/shared/components/alert/alert.service';


@Component({
    selector: 'app-order-review',
    templateUrl: 'order-review.component.html'
})

export class OrderReviewComponent implements OnInit {

    starRating: number = 1

    // Perdoname pofavo
    styleOneStar: string
    styleTwoStar: string
    styleThreeStar: string
    styleFourStar: string
    styleFiveStar: string

    formReview: FormGroup

    @Input() idOrder: number

    constructor(
        private _formBuilder: FormBuilder,
        private _alertService: AlertService,
        private _orderService: OrderService
    ) { }

    ngOnInit() {
        this.crearFormReview()
        this.changeStarRating(1)
    }

    crearFormReview() {
        this.formReview = this._formBuilder.group({
            commentsOnOrder: [null, [Validators.required]]
        })
    }

    async calificarPedido() {
        if (this.formReview.invalid) {

            let contenido: Alert = {
                type: 'alert',
                contenido: 'Debe completar los datos requeridos'
            }

            this._alertService.open(contenido)
            this.formReview.markAllAsTouched()
            return
        }

        let form = this.formReview.value

        let orderReview: OrderReview = {
            id: this.idOrder,
            commentsOnOrder: form.commentsOnOrder,
            punctuation: this.starRating
        }

        try {
            let data = await this._orderService.registrarOrderReview(orderReview)

            let contenido: Alert = {
                type: 'success',
                contenido: data.message
            }

            this._alertService.open(contenido)
            this.formReview.reset()
        }

        catch (error) {
            console.log(error)
        }
    }

    changeStarRating(starRating: number) {

        this.starRating = starRating

        switch (starRating) {
            case 1:
                this.styleOneStar = '-filled active'
                this.styleTwoStar = ''
                this.styleThreeStar = ''
                this.styleFourStar = ''
                this.styleFiveStar = ''

                break;
            case 2:
                this.styleOneStar = '-filled active'
                this.styleTwoStar = '-filled active'
                this.styleThreeStar = ''
                this.styleFourStar = ''
                this.styleFiveStar = ''
                break;
            case 3:
                this.styleOneStar = '-filled active'
                this.styleTwoStar = '-filled active'
                this.styleThreeStar = '-filled active'
                this.styleFourStar = ''
                this.styleFiveStar = ''
                break;
            case 4:
                this.styleOneStar = '-filled active'
                this.styleTwoStar = '-filled active'
                this.styleThreeStar = '-filled active'
                this.styleFourStar = '-filled active'
                this.styleFiveStar = ''

                break;
            case 5:
                this.styleOneStar = '-filled active'
                this.styleTwoStar = '-filled active'
                this.styleThreeStar = '-filled active'
                this.styleFourStar = '-filled active'
                this.styleFiveStar = '-filled active'
                break;

            default:
                break;
        }
    }

    cssValidate(control: string) {
        if (this.formReview.controls[control].touched) {
            if (this.formReview.controls[control].errors) return 'invalid'
            else return 'valid'
        }
        else return ''
    }

}

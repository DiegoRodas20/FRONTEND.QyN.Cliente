import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Product } from 'src/app/core/models/product.model';
import { UserClient } from 'src/app/core/models/user-client.model';
import { CarritoService } from 'src/app/core/services/carrito.service';
import { LocalStorageService } from 'src/app/core/services/local-storage.service';
import { OrderService } from 'src/app/core/services/order.service';
import Swal from 'sweetalert2';
declare var tns;


@Component({
    selector: 'app-pedido',
    templateUrl: 'pedido.component.html',
    styleUrls: ['./pedido.component.scss']
})

export class PedidoComponent implements OnInit {

    lCarrito: Product[] = []
    user: UserClient
    formPedido: FormGroup
    tipoDocumento: string

    constructor(
        private _carritoService: CarritoService,
        private _formBuilder: FormBuilder,
        private _orderService: OrderService,
        private _localStorage: LocalStorageService,
        private _router: Router
    ) { }

    ngOnInit() {
        this.crearFormPedido()
        // this.getCarrito()
        this.observableCarrito()
        this.getUserData()
        this.animationSlider()
    }

    observableCarrito() {
        this._localStorage.watch('Carrito').subscribe(
            (result) => {
                if (result) {
                    this.lCarrito = result
                }
                else {
                    this.lCarrito
                }
            }
        )
    }

    crearFormPedido() {
        this.formPedido = this._formBuilder.group({
            email: [null, []],
            numberDocument: [null, []],
            address: [null, []],
            name: [null, []],
            comments: [null],
        })
    }

    getCarrito() {
        this.lCarrito = this._carritoService.getCarrito()
        console.log(this.lCarrito)
    }

    getUserData() {
        let userData = JSON.parse(localStorage.getItem('Usuario'))
        if (userData) {
            this.user = userData.data
            this.formPedido.controls['name'].setValue(this.user.name)
            this.formPedido.patchValue(this.user.client)
            this.tipoDocumento = this.user.client.typeDocument
        }
    }

    async registrarPedido() {

        if (this.formPedido.invalid) {
            Swal.fire({
                title: '¡Atención!',
                text: 'Debe completar los datos requeridos',
                toast: true,
                position: 'top-end',
                icon: 'warning',
                timer: 4000,
                showCloseButton: true,
                showConfirmButton: false
            })
            this.formPedido.markAllAsTouched()
            return
        }

        let form = this.formPedido.value
        let Pedido: any = {
            userId: this.user.id,
            comments: form.comments,
            address: form.address,
            orderDetail: this.lCarrito.map(item => { return { idProduct: item.id, quantity: item.quantity } })
        }

        console.log(Pedido)

        try {
            let data = await this._orderService.registrarPedido(Pedido)
            // console.log(data.message)
            Swal.fire({
                title: '¡Éxito!',
                text: 'Se registro el pedido correctamente.',
                toast: true,
                position: 'top-end',
                icon: 'success',
                timer: 4000,
                showCloseButton: true,
                showConfirmButton: false
            }).then((result) => {
                localStorage.clear()
                this._router.navigate(['/catalogo'])
            })
        }
        
        catch (error) {

            let mensajeprueba = "";

            for (let i of error.error.error) {
                mensajeprueba += `• ${i}<br>`
            }

            Swal.fire({
                title: '¡Atención!',
                html: `<div>${mensajeprueba}</div>`,
                toast: true,
                position: 'top-end',
                icon: 'warning',
                showCloseButton: true,
                showConfirmButton: false,
                width: '25em'
            })

            //this.formPedido.reset()

        }

    }

    getSubTotal() {
        let subTotal = this._carritoService.getSubTotal(this.lCarrito)
        return subTotal
    }

    getMontoTotal() {
        let montoTotal = this.getSubTotal() + (this.getSubTotal() * 0.18)
        return montoTotal
    }

    animationSlider() {
        setTimeout(() => {

            // Hero Slider
            tns({
                container: '.tns-carousel-inner',
                controlsText: ['<i class="ci-arrow-left"></i>', '<i class="ci-arrow-right"></i>'],
                nav: false,
                gutter: 15,
                loop: false
                // axis: "vertical"
            });
        }, 500);
    }

}

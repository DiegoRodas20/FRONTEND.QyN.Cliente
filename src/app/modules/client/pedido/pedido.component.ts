import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CarritoService } from 'src/app/core/services/carrito.service';
import { OrderService } from 'src/app/core/services/order.service';
import Swal from 'sweetalert2';


@Component({
    selector: 'app-pedido',
    templateUrl: 'pedido.component.html',
    styleUrls: ['./pedido.component.scss']
})

export class PedidoComponent implements OnInit {

    lCarrito: any[] = []
    formPedido: FormGroup

    constructor(
        private _router: Router,
        private _orderService: OrderService,
        private _carritoService: CarritoService,
        private _formBuilder: FormBuilder,
    ) { }

    ngOnInit() {
        this.getCarrito()
        this.crearFormPedido()
    }

    crearFormPedido() {
        this.formPedido = this._formBuilder.group({
            rucClient: [null, [Validators.required]],
            nameClient: [null, [Validators.required]],
            phoneClient: [null, [Validators.required]],
            emailClient: [null, [Validators.required]],
            address: [null, [Validators.required]],
            comments: [null],
        })
    }

    getCarrito() {
        this.lCarrito = this._carritoService.getCarrito()
        console.log(this.lCarrito)
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
            comments: form.comments,
            rucClient: form.rucClient,
            nameClient: form.nameClient,
            phoneClient: form.phoneClient,
            emailClient: form.emailClient,
            address: form.address,
            orderDetail: this.lCarrito.map(item => { return { idProduct: item.id, quantity: item.cantidad } })
        }

        console.log(Pedido)

        try {
            let data = await this._orderService.registrarPedido(Pedido)
            console.log(data)
            Swal.fire({
                title: '¡Éxito!',
                text: 'data.message',
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

}

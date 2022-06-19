import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CarritoService } from 'src/app/core/services/carrito.service';
import { PedidoService } from 'src/app/core/services/pedido.service';
import { DetallePedido, Pedido } from 'src/app/shared/models/pedido.model';
import Swal from 'sweetalert2';


@Component({
    selector: 'app-pedido',
    templateUrl: 'pedido.component.html'
})

export class PedidoComponent implements OnInit {

    lCarrito: any[] = []
    formPedido: FormGroup

    constructor(
        private _pedidoService: PedidoService,
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
            comments: [null, [Validators.required]],
        })
    }

    getCarrito() {
        this.lCarrito = this._carritoService.getCarrito()
        console.log(this.lCarrito)
    }

    async registrarPedido() {

        if (this.formPedido.invalid) {
            Swal.fire({
                icon: 'warning',
                title: 'Atención',
                text: 'Debe completar los datos requeridos'
            })
            return
        }

        let form = this.formPedido.value
        let Pedido: any = {
            comments: form.comments,
            rucClient: form.rucClient,
            nameClient: form.nameClient,
            phoneClient: form.phoneClient,
            emailClient: form.emailClient,
            orderDetail: this.lCarrito.map(item => { return { idProduct: item.id, quantity: item.cantidad } })
        }

        console.log(Pedido)
        try {
            let data = await this._pedidoService.registrarPedido(Pedido)
            Swal.fire({
                icon: 'success',
                title: 'Éxito',
                text: data.message
            })
        }
        catch (error) {
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'Ha ocurrido un error de validación'
            })
            console.error(error)
        }

    }

    getSubTotal() {
        let subTotal = this._carritoService.getSubTotal(this.lCarrito)
        return subTotal
    }

}
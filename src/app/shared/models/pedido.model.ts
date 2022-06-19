export interface Pedido {
    comments: string,
    rucClient: string,
    nameClient: string,
    phoneClient: string,
    emailClient: string,
    orderDetail: DetallePedido[]
}

export interface DetallePedido {
    idProducto: number,
    quantity: number
}

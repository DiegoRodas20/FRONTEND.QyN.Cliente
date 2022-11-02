
export interface RegisterOrder {
    userId: number,
    address: string,
    comments: string,
    orderDetail: OrderDetail[]
}

export interface OrderDetail {
    idProducto: number,
    quantity: number
}
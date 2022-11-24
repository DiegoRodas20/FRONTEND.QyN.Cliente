
export interface Order {
    id?: number,
    orderStatusId?: number,
    orderStatus?: string,
    estimatedDate?: string,
    address?: string,
    comments?: string,
    orderDetails?: OrderDetail[],
    punctuation?: number,
    postComments?: string
}

export interface RegisterOrder {
    userId: number,
    address: string,
    comments: string,
    orderDetail: OrderDetail[]
}

export interface OrderDetail {
    idProduct?: number,
    quantity: number,
    urlImage?: string,
    name?: string,
    type?: string,
    salesPrice?: number
}

export interface OrderReview {
    id: number,
    commentsOnOrder: string,
    punctuation: number
}

export interface OrderHistorial {
    status?: string,
    date?: string
}

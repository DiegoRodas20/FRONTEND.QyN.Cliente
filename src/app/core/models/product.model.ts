export interface Product {
    id: number,
    code: string,
    name: string,
    type: string,
    quantity?: number,
    salesPrice: number,
    carritoPrice?: number,
    urlImage: string,
    isSelected?: boolean
}
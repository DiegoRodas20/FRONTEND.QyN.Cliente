export interface Producto {
    id: number,
    code: string,
    name: string,
    type: string,
    salesPrice: number,
    purchasePrice: number,
    stock: number,
    showInCatalog: boolean,
    urlImage: string,
    cantidad: number
}
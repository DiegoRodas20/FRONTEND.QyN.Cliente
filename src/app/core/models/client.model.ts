export interface Client {
    address: string,
    email: string,
    numberDocument: string,
    typeDocument: string,
}

export interface UpdateClient {
    id: number,
    typeDocumentId: number,
    numberDocument: number,
    name: string,
    area: string,
    phone: string,
    email: string,
    address: string
}
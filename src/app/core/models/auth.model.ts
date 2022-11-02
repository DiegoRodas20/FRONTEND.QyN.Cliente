export interface SignIn {
    userName: string,
    password: string
}

export interface SignUp {
    email: string,
    password: string,
    typeDocumentId: number,
    numberDocument: string,
    companyName: string,
    phone: string,
    address: string,
    firstName: string,
    lastName: string,
    surName: string,
    bornDate: string
}

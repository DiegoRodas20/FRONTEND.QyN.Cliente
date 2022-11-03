import { Client } from "./client.model";

export interface UserClient {
    id: number,
    client: Client,
    name: string
    username: string,
}
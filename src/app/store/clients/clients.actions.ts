import { Clients } from "src/app/Models/clients";

export class AddClients{
    static readonly type= '[CLIENTS] Add';
    constructor( public payload: Clients[] ){}
}

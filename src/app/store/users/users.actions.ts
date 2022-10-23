import { Users } from "src/app/Models/users";

export class AddUsers{
    static readonly type = '[USERS] Add';
    constructor( public payload: Users[] ){}
}

export class RemoveUsers{
    static readonly type = '[USERS] Remove';
    constructor( public payload: number ){}
}
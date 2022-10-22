import { Vlan } from "src/app/Models/vlan";

export class AddVlans{
    static readonly type = '[VLANS] Add';
    constructor(public payload: Vlan[]){}
}

export class RemoveVlans{
    static readonly type = '[VLANS] Remove';
    constructor(public payload: number){}
}
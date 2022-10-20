import { Ont } from '../../Models/ont';

export class AddOnt{
    static readonly type = '[ONT] Add';
    constructor( public payload: Ont[] ){}
}

export class RemoveOnt{
    static readonly type = '[ONT] Remove';
    constructor( public payload: number ){}
}
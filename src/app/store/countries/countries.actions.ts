import { Pais } from '../../Models/pais';

export class AddPais{
    static readonly type = '[PAIS] Add';
    constructor( public payload: Pais[] ) {}
}

export class RemovePais{
    static readonly type = '[PAIS] Remove';
    constructor( public payload: number ) {}
}
import { OntModels } from "../../Models/ontModels";

export class AddModelOnt{
    static readonly type = '[ONTMODELS] Add';
    constructor( public payload: OntModels[] ) {}
}

export class RemoveOntModel{
    static readonly type = '[ONTMODELS] Remove';
    constructor( public payload: number ){}
}
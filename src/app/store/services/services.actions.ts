import { Services } from "src/app/Models/services";

export class ADdServices{
    static readonly type = '[SERVICES] Add';
    constructor( public payload: Services[] ){}
}
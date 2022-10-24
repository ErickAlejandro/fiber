import { Planes } from "src/app/Models/planes";

export class AddPlans{
    static readonly type = '[PLANS] Add';
    constructor( public payload: Planes[] ){}
}
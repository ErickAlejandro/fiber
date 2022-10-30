import { Historial } from "src/app/Models/historial";

export class AddHistorial{
    static readonly type = '[HISTORIAL] add'
    constructor(public payload: Historial[]){}
}
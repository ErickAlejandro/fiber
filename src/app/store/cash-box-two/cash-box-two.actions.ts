import { CashBoxesTwo } from "src/app/Models/cash-boxes-two";

export class AddCashBoxTwo{
    static readonly type = '[CASHBOXTWO] Add'
    constructor(public payload: CashBoxesTwo[]){}
}

export class RemoveCashBoxTwo{
    static readonly type = '[CASHBOXTWO] Remove';
    constructor(public payload: number){}
}
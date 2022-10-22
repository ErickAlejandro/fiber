import { CashBoxes } from "src/app/Models/cash-boxes";

export class AddCashBoxOne{
    static readonly type = '[CASHBOXONE] Add';
    constructor(public payload: CashBoxes[]){}
}

export class RemoveCashBoxesOne{
    static readonly type = '[CASHBOXONE] Remove';
    constructor(public payload: number){}
}
import { State, Action, StateContext, Selector } from '@ngxs/store';
import { CashBoxesOneStateModel } from './cash-box-one.model';
import { AddCashBoxOne, RemoveCashBoxesOne } from './cash-box-one.actions';

@State({
    name: 'cashBoxOne',
    defaults: {
        cashBoxOne: []
    }
})
export class CashBoxState{
    @Selector()
    static getCashBoxesOne(state: CashBoxesOneStateModel) { return state.cashBoxOne }


    @Action(AddCashBoxOne)
    add({ getState, patchState }: StateContext<CashBoxesOneStateModel>, {payload}: AddCashBoxOne){
        const state = getState();
        patchState({
            cashBoxOne: [...state.cashBoxOne, ...payload]
        })
    }



    @Action(RemoveCashBoxesOne)
    remove({ getState, patchState }: StateContext<CashBoxesOneStateModel>, { payload }: RemoveCashBoxesOne){
        patchState({
            cashBoxOne: getState().cashBoxOne.filter(cashBoxOne => cashBoxOne.id_cajanivel1 !== payload)
        })
    }
}
import { State, Action, StateContext, Selector } from '@ngxs/store';
import { CashBoxesStateModel } from './cash-box-two.model';
import { AddCashBoxTwo, RemoveCashBoxTwo } from './cash-box-two.actions';

@State({
    name: 'cashBoxesTwo',
    defaults: {
        cashBoxesTwo: []
    }
})
export class CashBoxesState{
    @Selector()
    static getCashBoxesTwo(state: CashBoxesStateModel){return state.cashBoxesTwo}


    @Action(AddCashBoxTwo)
    add({ getState, patchState }: StateContext<CashBoxesStateModel>, { payload }: AddCashBoxTwo){
        const state = getState();
        patchState({
            cashBoxesTwo: [...state.cashBoxesTwo, ...payload]
        });
    }


    @Action(RemoveCashBoxTwo)
    remove({ getState, patchState }: StateContext<CashBoxesStateModel>, {payload}: RemoveCashBoxTwo){
        patchState({
            cashBoxesTwo: getState().cashBoxesTwo.filter( cashBoxTwo => cashBoxTwo.id_cajanivel2 !== payload )
        })
    }
}
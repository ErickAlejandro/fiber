import { State, Action, StateContext, Selector } from '@ngxs/store';
import { HistorialStateModel } from './historial.model';
import { AddHistorial } from './historial.actions';

@State({
    name: 'historial',
    defaults: {
        historial: []
    }
})
export class HistorialState{
    @Selector()
    static getHistorial(state: HistorialStateModel){ return state.historial }

    @Action(AddHistorial)
    add({ getState, patchState }: StateContext<HistorialStateModel>, { payload }: AddHistorial){
        const state = getState();
        patchState({
            historial: [...state.historial, ...payload]
        });
    }
}
import { State, Action, StateContext, Selector } from '@ngxs/store';
import { OntStateModel } from "./ont.model";
import { AddOnt, RemoveOnt } from "./ont.actions";

@State({
    name: 'onts',
    defaults: {
        onts: []
    }
})
export class OntState {
    @Selector()
    static getOnts(state: OntStateModel) { return state.onts }

    // AGREGAR UN NUEVO ESTADO
    @Action(AddOnt)
    add({getState, patchState}: StateContext<OntStateModel>, {payload}: AddOnt){
        const state = getState();
        patchState({
            onts: [...state.onts, ...payload]
        });
    }


    // ELIMINAR UN POST DEL ESTADO
    @Action(RemoveOnt)
    remove({getState, patchState}: StateContext<OntStateModel>, {payload}: RemoveOnt){
        patchState({
            onts: getState().onts.filter(ont => ont.id_ont !== payload)
        })
    }
}
import { State, Action, StateContext, Selector } from '@ngxs/store';
import { AddModelOnt, RemoveOntModel } from './ontModel.actions';
import { OntModelStateModel } from './ontModel.model';

@State({
    name: 'ontModels',
    defaults: {
        ontModels: []
    }
})
export class OntModelsState{
    @Selector()
    static getOntModels(state: OntModelStateModel){ return state.ontModels }

    @Action(AddModelOnt)
    add({ getState, patchState }: StateContext<OntModelStateModel>, { payload }: AddModelOnt){
        const state = getState();
        patchState({
            ontModels: [...state.ontModels, ...payload]
        });
    }

    @Action(RemoveOntModel)
    remove({ getState, patchState }: StateContext<OntModelStateModel>, { payload }: RemoveOntModel){
        patchState({
            ontModels: getState().ontModels.filter(ontModel => ontModel.id_modelosont !== payload)
        })
    }
}
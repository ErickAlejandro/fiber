import { State, Action, StateContext, Selector } from '@ngxs/store';
import { ProvincesStateModel } from './provinces.model';
import { AddProvinces, RemoveProvinces } from './provinces.actions';

@State({
    name: 'provinces',
    defaults: {
        provinces:[]
    }
})
export class ProvincesState{
    @Selector()
    static getProvince(state: ProvincesStateModel){ return state.provinces }

    // AGREGAR UN NUEVO ESTADO

    @Action(AddProvinces)
    add({ getState, patchState} : StateContext<ProvincesStateModel>, { payload }: AddProvinces){
        const state = getState()
        patchState({
            provinces: [...state.provinces, ...payload]
        });
    }

    // ELIMINCAR UN POST
    @Action(RemoveProvinces)
    remove({ getState, patchState}: StateContext<ProvincesStateModel>, {payload}: RemoveProvinces){
        patchState({
            provinces: getState().provinces.filter(province => province.id_provincia !== payload)
        });
    }
}
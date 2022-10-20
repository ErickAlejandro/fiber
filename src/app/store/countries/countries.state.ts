import { State, Action, StateContext, Selector } from '@ngxs/store';
import { PaisStateModel } from './counties.model';
import { AddPais, RemovePais } from './countries.actions';

@State({
    name: 'paises',
    defaults: {
        paises:[]
    }
})

export class PaisState{
    @Selector()
    static getPais(state: PaisStateModel){ return state.paises; }

    @Action(AddPais)
    add({ getState, patchState}: StateContext<PaisStateModel>, { payload } : AddPais){
        const state = getState();
        patchState({
            paises: [...state.paises, ...payload]
        })
    }

    @Action(RemovePais)
    remove({ getState, patchState }: StateContext<PaisStateModel>, { payload } : RemovePais){
        patchState({
            paises: getState().paises.filter(pais => pais.id_pais !== payload)
        })
    }

}
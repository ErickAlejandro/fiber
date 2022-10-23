import { State, Action, StateContext, Selector } from '@ngxs/store';
import { ServicesStateModel } from './services.model';
import { ADdServices } from './services.actions';

@State({
    name: 'services',
    defaults: {
        services: []
    }
})
export class ServicesState{
    @Selector()
    static getServices(state: ServicesStateModel){ return state.services; }


    @Action(ADdServices)
    add({ getState, patchState }: StateContext<ServicesStateModel>, { payload }: ADdServices){
        const state = getState();
        patchState({
            services: [...state.services, ...payload]
        });
    }
}
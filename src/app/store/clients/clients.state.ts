import { State, Action, StateContext, Selector } from '@ngxs/store';
import { ClientStateModel } from './clients.model';
import { AddClients } from './clients.actions';

@State({
    name: 'clients',
    defaults: {
        clients: []
    }
})
export class ClientState{
    @Selector()
    static getClients(state: ClientStateModel){ return state.clients }


    @Action(AddClients)
    add({ getState, patchState }: StateContext<ClientStateModel>, { payload }: AddClients){
        const state = getState();
        patchState({
            clients: [...state.clients, ...payload]
        });
    }

}
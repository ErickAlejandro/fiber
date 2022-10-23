import { State, Action, StateContext, Selector } from '@ngxs/store';
import { UsersStateModel } from './users.model';
import { AddUsers, RemoveUsers } from './users.actions';

@State({
    name: 'users',
    defaults: {
        users: []
    }
})
export class UsersState{
    @Selector()
    static getUsers(state: UsersStateModel){ return state.users; }


    @Action(AddUsers)
    add({ getState, patchState }: StateContext<UsersStateModel>, { payload }: AddUsers){
        const state = getState();
        patchState({
            users: [...state.users, ...payload]
        });
    }



    @Action(RemoveUsers)
    remove({ getState, patchState }: StateContext<UsersStateModel>, { payload }: RemoveUsers){
        patchState({
            users: getState().users.filter(user => user.id_usuario !== payload)
        })
    }
}
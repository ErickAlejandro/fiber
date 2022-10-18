import { State, Action, StateContext, Selector } from '@ngxs/store'
import { LoginStateModel } from './login.model'
import { AddLogin, RemoveLogin } from './login.actions'

@State({
    name: 'login',
    defaults: {
      login: []
    }
  })
  export class LoginState {
    @Selector()
    static getCities(state: LoginStateModel) { return state.login; }
  
    // Añade un nuevo post al estado
    @Action(AddLogin)
    add({ getState, patchState }: StateContext<LoginStateModel>, { payload }: AddLogin) {
      const state = getState();
      patchState({
        login: [...state.login, ...payload]
      });
    }
  
  
    // Elimina un post del estado
    @Action(RemoveLogin)
    remove({ getState, patchState }: StateContext<LoginStateModel>, { payload }: RemoveLogin) {
      patchState({
        login: getState().login.filter(login => login.id_usuario !== payload)
      });
    }
  }

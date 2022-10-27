import { State, Action, StateContext, Selector } from '@ngxs/store'
import { LoginStateModel } from './login.model'
import { AddLogin } from './login.actions'

@State({
  name: 'login',
  defaults: {
    login: []
  }
})
export class LoginState {
  @Selector()
  static getCities(state: LoginStateModel) { return state.login; }


  @Action(AddLogin)
  add({ getState, patchState }: StateContext<LoginStateModel>, { payload }: AddLogin) {
    const state = getState();
    patchState({
      login: [...payload]
    });
  }

}

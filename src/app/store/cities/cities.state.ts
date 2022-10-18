import { State, Action, StateContext, Selector } from '@ngxs/store';
import { CitiesStateModel } from './cities.model';
import { AddCities, RemoveCities } from './cities.actions';

@State({
  name: 'cities',
  defaults: {
    cities: []
  }
})
export class CitiesState {
  @Selector()
  static getCities(state: CitiesStateModel) { return state.cities; }

  // Añade un nuevo post al estado
  @Action(AddCities)
  add({ getState, patchState }: StateContext<CitiesStateModel>, { payload }: AddCities) {
    const state = getState();
    patchState({
      cities: [...state.cities, ...payload]
    });
  }


  // Elimina un post del estado
  @Action(RemoveCities)
  remove({ getState, patchState }: StateContext<CitiesStateModel>, { payload }: RemoveCities) {
    patchState({
      cities: getState().cities.filter(city => city.id_ciudad !== payload)
    });
  }
}
import { State, Action, StateContext, Selector } from '@ngxs/store';
import { PlanStateModel } from './plans.model';
import { AddPlans } from './plans.actions';

@State({
    name: 'plans',
    defaults: {
        plans: []
    }
})
export class PlanState{
    @Selector()
    static getPlans(state: PlanStateModel){ return state.plans }


    @Action(AddPlans)
    add({ getState, patchState }: StateContext<PlanStateModel>, { payload }: AddPlans){
        const state = getState();
        patchState({
            plans: [...state.plans, ...payload]
        });
    }

}
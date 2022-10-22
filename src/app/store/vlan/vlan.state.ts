import { State, Action, StateContext, Selector } from '@ngxs/store';
import { VlansStateModel } from './vlan.model';
import { AddVlans, RemoveVlans } from './vlan.actions';

@State({
    name: 'vlans',
    defaults: {
        vlans: []
    }
})
export class VlansState{
    @Selector()
    static getVlans(state: VlansStateModel){ return state.vlans }


    @Action(AddVlans)
    add({getState, patchState}: StateContext<VlansStateModel>, {payload}: AddVlans){
        const state = getState();
        patchState({
            vlans: [...state.vlans, ...payload]
        })
    }


    
    @Action(RemoveVlans)
    remove({ getState, patchState }: StateContext<VlansStateModel>, {payload}: RemoveVlans){
        patchState({
            vlans: getState().vlans.filter(vlan => vlan.id_vlan !== payload)
        })
    }
}
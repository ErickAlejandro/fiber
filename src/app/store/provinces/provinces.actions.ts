import { Pronvinces } from '../../Models/provinces';

export class AddProvinces {
  static readonly type = '[PROVINCES] Add';
  constructor( public payload: Pronvinces[] ) {}
}

export class RemoveProvinces {
  static readonly type = '[CITIES] Remove';
  constructor( public payload: number ) {}
}
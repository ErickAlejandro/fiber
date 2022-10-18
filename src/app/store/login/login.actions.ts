import { Login } from '../../Models/login';

export class AddLogin {
  static readonly type = '[LOGIN] Add';
  constructor( public payload: Login[] ) {}
}

export class RemoveLogin {
  static readonly type = '[LOGIN] Remove';
  constructor( public payload: number ) {}
}
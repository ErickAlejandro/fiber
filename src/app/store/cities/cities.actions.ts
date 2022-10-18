import { Cities } from '../../Models/cities';

export class AddCities {
  static readonly type = '[CITIES] Add';
  constructor( public payload: Cities[] ) {}
}

export class RemoveCities {
  static readonly type = '[CITIES] Remove';
  constructor( public payload: number ) {}
}
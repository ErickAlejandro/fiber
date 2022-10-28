import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngxs/store';
import { timeout } from 'rxjs';
import { Cities } from './Models/cities';
import { Login } from './Models/login';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent{
  title = 'system-fiber-home';

  cities:Cities = new Cities
  login: Login = new Login
  
  constructor(private router:Router, private store: Store){
    this.store.select(state => state.login.login).subscribe((data: Login[]) => {
      this.login = data[0]
      console.log('LOGIN STATE: ' + JSON.stringify(data))
      
    });
    
  }

  
}

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngxs/store';
import { Cities } from './Models/cities';
import { Users } from './Models/users';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent{
  title = 'system-fiber-home';

  cities:Cities = new Cities
  users: Users = new Users
  
  constructor(private router:Router, private store: Store){
    this.store.select(state => state.users.users).subscribe((data: Users[]) => {
      this.users = data[0]
      console.log(this.users)
    });
  }

  getUser(){
    
  }
  
}

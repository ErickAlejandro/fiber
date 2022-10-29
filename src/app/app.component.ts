import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngxs/store';
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
  locaStorage!: any
  JsonStorage!: any
  
  constructor(private router:Router, private store: Store){
    this.locaStorage = localStorage.getItem('usuarioLogueado')
    this.JsonStorage = JSON.parse(this.locaStorage)
    // console.log(this.JsonStorage[0].usuario_usuario)
  }

  logOut(){
    this.locaStorage = localStorage.clear()
    setTimeout(()=>{
        addEventListener('click', e => {
          location.reload()
        })
    }, 1000)
  }
  
}

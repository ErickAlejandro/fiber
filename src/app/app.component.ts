import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngxs/store';
import Swal from 'sweetalert2';
import { Cities } from './Models/cities';
import { Login } from './Models/login';
import { Users } from './Models/users';


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
  userLogin: Users = new Users
  jsonString!: string
  
  constructor(private router:Router, private store: Store){

    this.userLogin = JSON.parse(localStorage.getItem('usuarioLogueado') || '[{}]')[0]
    this.jsonString = JSON.stringify(this.userLogin)

  }

  excelButton(){
    Swal.fire({
      position: 'top-end',
      icon: 'info',
      title: 'Esta función estará disponible muy pronto.',
    })
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

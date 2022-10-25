import { Component, OnInit } from '@angular/core';
import { Route, Router } from '@angular/router';
import { Store } from '@ngxs/store';
import { Login } from 'src/app/Models/login';
import { Users } from 'src/app/Models/users';
import { DataService } from 'src/app/services/data.service';
import { AddLogin } from 'src/app/store/login/login.actions';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  urlDataLogin = '/usuario/buscarUsuario.php?filtrar='

  user!: string
  password!: string
  rollSuperAdmin: string = 'SUPER ADMINISTRADOR'
  rolAdmin: string = 'ADMINISTRADOR'
  
  users: Users = new Users

  loginData!: Login[]

  constructor(private DataService: DataService, private store: Store, private router: Router) { }

  refresh() {
    addEventListener('click', e => {
      location.reload()
    })
  }

  login(user: string) {
    this.DataService.getDataLogin(this.urlDataLogin, user).subscribe((data: Login[]) => {
      this.loginData = data

      if (this.loginData[0].contrasena_usuario === this.password) {
        if (this.loginData[0].nombrerol_rol == this.rollSuperAdmin || this.loginData[0].nombrerol_rol == this.rolAdmin) {
          
          this.store.dispatch(new AddLogin(data))
          
          Swal.fire(
            'Bienvenido',
            `Has ingresado como: ${user}`,
            'success'
          )
          if(this.loginData[0].nombrerol_rol == this.rollSuperAdmin){
            this.router.navigate(['usuarios'])
          }else{
            this.router.navigate(['actividades-pendientes'])
          }
        } else {
          Swal.fire(
            'A ocurrido un error',
            `Usuario no permitido.`,
            'error'
          ) 
        }
      }else {
        Swal.fire(
          'A ocurrido un error',
          `El usuario o la contraseña no son correctos, intente nuevamente`,
          'error'
        )

      }
    })
  }

  ngOnInit(): void {
    
  }

}

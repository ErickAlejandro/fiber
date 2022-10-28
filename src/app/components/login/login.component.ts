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
  urlDataUserForLogin = '/usuario/filtrarUsuarioSuperAdmin.php?filtrar='
  loginDetails = new Login()

  user!: string
  password!: string
  rollSuperAdmin: string = 'SUPER ADMINISTRADOR'
  rolAdmin: string = 'ADMINISTRADOR'

  users: Users = new Users

  usuariosLog!: any

  loginData!: Login[]

  constructor(private DataService: DataService, private store: Store, private router: Router) { }

  refresh() {
    addEventListener('click', e => {
      location.reload()
    })
  }

  addLoginData(login: Login[]) {
    this.store.dispatch(new AddLogin(login))
  }

  login(userName: string, password: string) {

    this.DataService.getDataLogin(this.urlDataUserForLogin, userName).subscribe((data: Login[]) => {
      this.loginData = data.filter((user) => user.usuario_usuario == userName)


      if (this.loginData[0].contrasena_usuario == password) {
        if (this.loginData[0].nombrerol_rol == this.rolAdmin || this.loginData[0].nombrerol_rol == this.rollSuperAdmin) {
          this.addLoginData(data)

          // localStorage.setItem('usuarioLogueado', JSON.stringify(data));

          // this.usu = JSON.parse(localStorage.getItem('usuario'));
          // console.log(this.datoUsuario); ||| INTENTAR ENVIAR EL LOCAL STORAGE AL STATE

          this.router.navigate(['usuarios'])
        } else {
          Swal.fire({
            icon: 'error',
            title: 'Lo siento',
            text: 'El usuario no tiene permisos!'
          })
        }
      } else {
        this.refresh()
        Swal.fire({
          icon: 'error',
          title: 'Lo siento',
          text: 'La contraseña es incorrecta!'
        })
      }

    })

  }

  ngOnInit(): void {
  }

}

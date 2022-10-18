import { Component, OnInit } from '@angular/core';
import { Route, Router } from '@angular/router';
import { Store } from '@ngxs/store';
import { Login } from 'src/app/Models/login';
import { DataService } from 'src/app/services/data.service';
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
  rolTecnico: string = 'TECNICO'
  rolAdmin: string = 'ADMINISTRADOR'

  loginData!: Login[]

  constructor(private DataService: DataService, private store: Store, private router: Router) { }

  refresh(){
    addEventListener('click', e =>{
      location.reload()
    })
  }

  login(user: string) {
    this.DataService.getDataLogin(this.urlDataLogin, user).subscribe((data: Login[]) => {
      this.loginData = data

      if (this.loginData[0].contrasena_usuario == this.password && this.loginData[0].nombrerol_rol === this.rollSuperAdmin) {
        Swal.fire(
          'Bienvenido',
          `Has ingresado como: ${user}`,
          'success'
        )
          this.router.navigate(['actividades-pendientes'])
      
      }if(this.loginData[0].contrasena_usuario == this.password && this.loginData[0].nombrerol_rol === this.rolAdmin){
        Swal.fire(
          'Bienvenido',
          `Has ingresado como: ${user}`,
          'success'
        )
          this.router.navigate(['vlans'])

      }if(this.loginData[0].contrasena_usuario == this.password && this.loginData[0].nombrerol_rol === this.rolTecnico){
        Swal.fire(
          'Bienvenido',
          `Has ingresado como: ${user}`,
          'success'
        )
          this.router.navigate(['ciudades'])
      }else {
        Swal.fire(
          'A ocurrido un error',
          `El usuario o la contraseña no son correctos, intente nuevamente`,
          'error'
        )
        this.refresh()
      }
    })
  }

  ngOnInit(): void {

  }

}

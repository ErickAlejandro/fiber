import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  constructor() { }

  user!: string;
  password!: string;
  confirmPassword!: string;

  register() {
    console.log(this.user);
    console.log(this.password);
  }

  ngOnInit(): void {
  }

}

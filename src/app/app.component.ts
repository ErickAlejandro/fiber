import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Cities } from './Models/cities';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent{
  title = 'system-fiber-home';

  cities:Cities = new Cities
  
  constructor(private router:Router){
  }
  
}

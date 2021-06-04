import { registerLocaleData } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RegistrationService } from '../registrationservice.service';
import { User } from '../user';
import {ActivatedRoute, Route, Router} from '@angular/router'

@Component({
  selector: 'app-loginsuccess',
  templateUrl: './loginsuccess.component.html',
  styleUrls: ['./loginsuccess.component.css']
})
export class LoginsuccessComponent implements OnInit {
  user : User;
  username:string;
  queryParam: string = '';

  constructor(private route:ActivatedRoute, private router:Router, private registrationService:RegistrationService) { }

  ngOnInit(): void {  
  }
  backtologin(){
    this.router.navigate(['/login']);
  }

}

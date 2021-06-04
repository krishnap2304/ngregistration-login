import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { User } from '../user';
import {RegistrationService} from '../registrationservice.service'
import {Router} from '@angular/router'
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { NgRecaptcha3Service } from 'ng-recaptcha3';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {
  user : User;
  signupForm !: FormGroup;  
  private siteKey = '6LeZmfEaAAAAACBI5Ld-TPg6uhRMkZ6foarbHk0U';
  formData:any;

  constructor(private formBuilder:FormBuilder, private _service:RegistrationService, private  _router:Router, private recaptcha3:NgRecaptcha3Service) { }

  ngOnInit(): void {
  this.user = new User();
   this.signupForm = new FormGroup({
     username : new FormControl('',[Validators.required]),
     email : new FormControl('',[Validators.required]),
     password :new FormControl('',[Validators.required])
   });
   this.recaptcha3.init(this.siteKey);
  }
  
  get f(){
    return this.signupForm.controls;
  }
  btnClick=  () => {
    this._router.navigateByUrl('/login');
  };

  registerUser(){
    console.log("is signform valid"+this.signupForm.valid);
    this.recaptcha3.getToken().then((token: string) => {
      this.formData = this.signupForm.value;
      console.log('Captcha Generated Successfully');
      console.log(token);
      this.user.captchaResp = token;
      console.log(this.user.captchaResp);
      this.user.roles = ['ROLE_USER'];
      this.user.username = this.signupForm.controls['username'].value;
      this.user.password = this.signupForm.controls['password'].value;
      this.user.email = this.signupForm.controls['email'].value;
    this._service.registerUser(this.user).subscribe(
      data=>{
        console.log("Response Received")
        this._router.navigate(['/loginsuccess']);
      },
      error => console.log("There was an error in the registraion process...")
    );
    }, (error: any) => {
		  console.log('err ',error)
	  });
    
    
  }

  destroyRecaptcha() {
    this.recaptcha3.destroy();
  }
  
}

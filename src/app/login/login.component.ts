import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators} from '@angular/forms'
import { RegistrationService } from '../registrationservice.service'
import { User } from '../user';
import { NgRecaptcha3Service } from 'ng-recaptcha3';
import { string } from 'joi';
import { HttpParams } from '@angular/common/http';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  user = new User();
  loginForm !: FormGroup;
  private siteKey = '6LeZmfEaAAAAACBI5Ld-TPg6uhRMkZ6foarbHk0U';
  formData:any;
  params: HttpParams;

  constructor(private formBuilder: FormBuilder, private _service:RegistrationService, private  _router:Router, private recaptcha3:NgRecaptcha3Service) { }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
        username :['',Validators.required],
        password :['',Validators.required]
    });
    this.recaptcha3.init(this.siteKey);
  }
  loginUser(){
      this.recaptcha3.getToken().then(token => {
        this.formData = this.loginForm.value;
        this.formData.recaptchaToken = token;
        this.user.captchaResp = token;
        this.user.username = this.loginForm.controls['username'].value;
        this.user.password = this.loginForm.controls['password'].value;
        this._service.loginUser(this.user, this.user.captchaResp).subscribe(
          (          data: any)=>{
            console.log("Response Received")
            console.log(this.loginForm.controls['username'].value)
            this._router.navigate(['/loginsuccess']);
          },
          (          error: any) => console.log("Bad Credentials...")
        );
      }, error => {
		  console.log('error while generating the recaptcha token',error)
	      });
     
    }
    get l(){
     return  this.loginForm.controls;
    }
    destroyRecaptcha() {
      this.recaptcha3.destroy();
    }  
    btnClick=  () => {
      this._router.navigateByUrl('/login');
    };

    btnClickRegister(){
      this._router.navigateByUrl('/');

    }
    btnClickResetPwd(){
      this._router.navigateByUrl('/resetpassword');

    }
    btnClickChangePwd(){
      this._router.navigateByUrl('/changepassword');
    }
}

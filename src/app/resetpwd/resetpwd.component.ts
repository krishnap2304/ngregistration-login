import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup,  Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { RegistrationService } from '../registrationservice.service';
import { User } from '../user';

@Component({
  selector: 'app-resetpwd',
  templateUrl: './resetpwd.component.html',
  styleUrls: ['./resetpwd.component.css']
})
export class ResetpwdComponent implements OnInit {

resetpwdForm !: FormGroup;
user : User;
formData:any;
 
 
  constructor(private formBuilder:FormBuilder, private _service:RegistrationService, private _router:Router) { }

  ngOnInit(): void {
    this.user = new User();
    this.resetpwdForm = this.formBuilder.group({
        username :new FormControl('',[Validators.required]),
        newPassword :new FormControl('',[Validators.required])
    });      
  
   }

   get r(){
    return this.resetpwdForm.controls;
  }

  btnClick=  () => {
    this._router.navigateByUrl('/login');
  };
 
  resetPassword(){
    this.user.username = this.resetpwdForm.controls['username'].value;
    this.user.newPassword = this.resetpwdForm.controls['newPassword'].value;
    this.user.roles = ["ROLE_USER"];
    this._service.resetPassword(this.user).subscribe(
      (      data: any)=>{
        console.log("Response Received")
        this._router.navigate(['/loginsuccess']);
      },
      (      error: any) => console.log("There was an error in the registraion process...")
    );
   
  }

  
    

}

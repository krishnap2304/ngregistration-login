import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { RegistrationService } from '../registrationservice.service';
import { User } from '../user';
import {FormsModule, ReactiveFormsModule} from '@angular/forms'

@Component({
  selector: 'app-changepwd',
  templateUrl: './changepwd.component.html',
  styleUrls: ['./changepwd.component.css']
})
export class ChangepwdComponent implements OnInit {
  changepwdForm : FormGroup;
  user : User;
  constructor(private formBuilder:FormBuilder, private service:RegistrationService, private router:Router) { }

  ngOnInit(): void {
    this.user = new User();
    this.changepwdForm = this.formBuilder.group({
        username :['',Validators.required],
        password :['',Validators.required],
        newPassword :['',Validators.required],
    });
  }
  changePassword(){


        this.user.username = this.changepwdForm.controls['username'].value;
        this.user.password = this.changepwdForm.controls['password'].value;
        this.user.newPassword = this.changepwdForm.controls['newPassword'].value;
        this.user.roles = ["ROLE_USER"];
        this.service.changePassword(this.user).subscribe(
          (          data: any)=>{
            console.log("Response Received")
            console.log(this.changepwdForm.controls['username'].value)
            this.router.navigate(['/login']);
          },
          (          error: any) => console.log("Bad Credentials...")
        );
    }
    get l(){
     return  this.changepwdForm.controls;
    }
    btnClick=  () => {
      this.router.navigateByUrl('/login');
    };

}

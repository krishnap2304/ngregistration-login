import { ChangeDetectorRef, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ChangepwdComponent } from './changepwd/changepwd.component';
import { LoginComponent } from './login/login.component';
import { LoginsuccessComponent } from './loginsuccess/loginsuccess.component';
import { RegistrationComponent } from './registration/registration.component';
import { ResetpwdComponent } from './resetpwd/resetpwd.component';

const routes: Routes = [
  {path:'',component:RegistrationComponent},
  {path:'login',component:LoginComponent},
  {path:'loginsuccess',component:LoginsuccessComponent},
  {path:'resetpassword',component:ResetpwdComponent},
  {path:'changepassword',component:ChangepwdComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

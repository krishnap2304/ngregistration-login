import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from './user';
import {HttpClient, HttpParams} from '@angular/common/http'

@Injectable({
  providedIn: 'root'
})
export class RegistrationService {
  params : HttpParams;
  
  constructor(private _http:HttpClient) { 
    this.params = new HttpParams();
  }
  public loginUser(user:User, token:string):Observable<any>{
    token = user.captchaResp;
    return this._http.post("http://ec2-52-90-22-216.compute-1.amazonaws.com:8088/api/auth/signin",user,{params:this.params.set("captcha-token",token)});
    //return this._http.post("http://localhost:8088/api/auth/signin",user,{params:this.params.set("captcha-token",token)});
  }
  public registerUser(user:User ):Observable<any>{
    return this._http.post("http://ec2-52-90-22-216.compute-1.amazonaws.com:8088/api/auth/signup",user);
    //return this._http.post("http://localhost:8088/api/auth/signup",user);
  }
 
  public resetPassword(user: User):any{
    return this._http.put("http://ec2-52-90-22-216.compute-1.amazonaws.com:8088/api/auth/reset-password",user);
    //return this._http.put("http://localhost:8088/api/auth/reset-password",user);
  }
  public changePassword(user : User):any{
    console.log("username"+user.username);
    console.log("password"+user.password);
    console.log("new Password"+user.newPassword); 
    return this._http.put("http://ec2-52-90-22-216.compute-1.amazonaws.com:8088/api/auth/forget-password",user);

    //return this._http.put("http://localhost:8088/api/auth/forget-password",user);
  }
  public getUserDetails(username : string):any{
    return this._http.get("http://ec2-52-90-22-216.compute-1.amazonaws.com:8088/api/auth/get-user/"+username);
    //return this._http.get("http://localhost:8088/api/auth/get-user/"+username);
  }

}
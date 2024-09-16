import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiService } from '../../core/services/api.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginSignupService {

  public loginUrl: string = "http://localhost:3000";
  public registerUrl: string = "http://localhost:3000"

  constructor(private http: HttpClient, private apiService:ApiService) { }

  authLogin(user_name:any,password:any):Observable<any>{
    return this.apiService.get(this.loginUrl+'/user?email='+user_name+"&password="+password)
  }

  userRegister(user_detail:any):Observable<any>{
    return this.apiService.post(this.registerUrl+'/user',user_detail)
  }

  adminLogin(user_name:any,password:any):Observable<any>{
    return this.apiService.get(this.loginUrl+'/user?email='+user_name+'&password='+password+'&role=admin')
  }

}

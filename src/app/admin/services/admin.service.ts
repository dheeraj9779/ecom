import { Injectable } from '@angular/core';
import { ApiService } from '../../core/services/api.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  public user_url = "http://localhost:3000/user/";
  public product_url = "http://localhost:3000/products/";
  public all_user = "http://localhost:3000/user";

  constructor(private apiService: ApiService) { }

  userDashboardData(){
    return this.apiService.get(this.user_url);
  }

  productDashboardData(){
    return this.apiService.get(this.product_url);
  }

  allUserDashboardData():Observable<any>{
    return this.apiService.get(this.all_user);
  }

  addUser(user_detail:any){
    return this.apiService.post(this.user_url,user_detail);
  }

  singleUser(user_id:any){
    return this.apiService.get(this.user_url+user_id)
  }

  updateUser(user_id:any,user_detail:any):Observable<any>{
    return this.apiService.put(this.user_url+user_id,user_detail)
  }

  deleteUser(user_id:any){
    return this.apiService.delete(this.user_url+user_id)
  }

}

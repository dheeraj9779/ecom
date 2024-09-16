import { Injectable } from '@angular/core';
import { ApiService } from '../../core/services/api.service';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {
  public user_url = "http://localhost:3000/user/";
  public product_url = "http://localhost:3000/products/";
  public order_url = "http://localhost:3000/orders";
  private single_product_id = new BehaviorSubject(null);
  currentProduct = this.single_product_id.asObservable();

  constructor(private apiService: ApiService) { }

  allProduct():Observable<any>{
    return this.apiService.get(this.product_url);
  }

  quickBuyProduct(product_id:any){
    this.single_product_id.next(product_id);
  }

  individualProduct(id:any){
    return this.apiService.get(this.product_url+id);
  }

  userDetail(id:any){
    return this.apiService.get(this.user_url+id);
  }

  insertNewOrder(order_detail:any):Observable<any>{
    return this.apiService.post(this.order_url,order_detail)
  }

  orderDashboardData():Observable<any>{
    return this.apiService.get(this.order_url);
  }

  productDashboardData():Observable<any>{
    return this.apiService.get(this.product_url);
  }

}


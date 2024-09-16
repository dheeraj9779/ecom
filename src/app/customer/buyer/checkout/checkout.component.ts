import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Order, Product, User } from '../../../core/Model/object-model';
import { CustomerService } from '../../services/customer.service';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-checkout',
  standalone: true,
  imports: [CommonModule,RouterLink],
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.css'
})
export class CheckoutComponent implements OnInit{
  single_product_id:any;
  user_id!:number;
  individual_product!:Product;
  user_name:any;
  user_address:any;
  user_contact_no:any;
  order_detail!:Order;

  constructor(private customerService: CustomerService, private router:Router){}

  ngOnInit(): void {
      this.customerService.currentProduct.subscribe(product => this.single_product_id = product)
      this.user_id = Number(sessionStorage.getItem("user_session_id"));
      this.productDetail(this.single_product_id);
      this.userAddress(this.user_id)
  }

  productDetail(single_product_id:any){
    this.customerService.individualProduct(single_product_id).subscribe(data => {
      this.individual_product = data;
      console.log("Single Product -->",this.individual_product)
    },error => {console.log("Error:",error)})
  }

  userAddress(user_id:any){
    this.customerService.userDetail(user_id).subscribe(data => {
      this.user_name = data.name
      this.user_address = data.address;
      this.user_contact_no = data.mobile;
    },error => {console.log("Error:",error)})
  }

  placeOrder(){
    this.order_detail = {
      id: 0,
      userId: this.user_id,
      sellerId: 2,
      product:{
        id: this.individual_product.id,
        name: this.individual_product.name,
        uploadPhoto: this.individual_product.uploadPhoto,
        productDesc: this.individual_product.productDesc,
        mrp: this.individual_product.mrp,
        discount:this.individual_product.discount,
        status: this.individual_product.status,
      },
      deliveryAddress:{
        id:0,
        addLine1: this.user_address.addLine1,
        addLine2: this.user_address.addLine2,
        city: this.user_address.city,
        state: this.user_address.state,
        pincode: this.user_address.pincode,
      },
      contact: this.user_contact_no,
      dateTime: new Date().toLocaleDateString()
    }
    this.customerService.insertNewOrder(this.order_detail).subscribe(data => {
      alert("Your order placed successfully");
      this.router.navigate(['buyer-dashboard'])
    },error => {console.log("Error:",error)})
  }

}

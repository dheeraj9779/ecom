import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AdminService } from '../services/admin.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './admin-dashboard.component.html',
  styleUrl: './admin-dashboard.component.css'
})
export class AdminDashboardComponent implements OnInit{

  user_dashboard_data:any;
  total_user:any = 0;
  admin_user:number = 0;
  seller_user:number = 0;
  buyer_user:number = 0

  product_dashboard_data:any;
  total_product:any = 0;
  publish_product:number = 0;
  inactive_product:number = 0;
  draft_product:number = 0

  constructor(private router:Router,private adminService: AdminService){

  }

  ngOnInit(): void {
      this.adminUserDashboardData()
      this.adminProductDashboardData()
  }

  userDashboard(){
    this.router.navigate(['admin','user'])
  }

  productDashboard(){
    this.router.navigate(['admin','product'])
  }

  adminUserDashboardData(){
    this.adminService.userDashboardData().subscribe(data => {
      this.user_dashboard_data = data;
      console.log(this.user_dashboard_data)
      for(let user in this.user_dashboard_data){
        if(this.user_dashboard_data[user].role == 'Admin'){
          ++this.admin_user
        }else if(this.user_dashboard_data[user].role == 'seller'){
          ++this.seller_user;
        }
        else if(this.user_dashboard_data[user].role == 'buyer'){
          ++this.buyer_user;
        }
        ++this.total_user;
      }
    },error => {
        console.log("my error",error)
      }
    )
  }

  adminProductDashboardData(){
    this.adminService.productDashboardData().subscribe(data => {
      this.product_dashboard_data = data;
      console.log(this.product_dashboard_data)
      for(let product in this.product_dashboard_data){
        if(this.product_dashboard_data[product].status == 'publish'){
          ++this.publish_product
        }else if(this.product_dashboard_data[product].status == 'inactive'){
          ++this.inactive_product;
        }
        else if(this.product_dashboard_data[product].status == 'draft'){
          ++this.draft_product;
        }
        ++this.total_product;
      }
    },error => {
      console.log("my error",error)
    }
  )
  }

}

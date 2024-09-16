import { CommonModule } from '@angular/common';
import { Component, input, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { CustomerService } from '../../services/customer.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-buyer-dashboard',
  standalone: true,
  imports: [CommonModule,RouterLink, FormsModule],
  templateUrl: './buyer-dashboard.component.html',
  styleUrl: './buyer-dashboard.component.css'
})
export class BuyerDashboardComponent implements OnInit{
  all_products:any;
  show_checkout:boolean = false;
  inputString:string = '';

  constructor(private router: Router, private customerService: CustomerService){

  }

  ngOnInit(): void {
    this.getAllProduct()
  }

  getAllProduct(){
    this.customerService.allProduct().subscribe(data => {
      this.all_products = data;
    },error => {console.log(error)})
  }

  buyProduct(id:number){
    this.show_checkout = true;
    this.customerService.quickBuyProduct(id);
    this.router.navigate(['checkout'])
  }

  addToCart(){
    alert("Cart")
  }


}

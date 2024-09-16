import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Product } from '../core/Model/object-model';
import { Router } from '@angular/router';
import { ProductService } from '../shared/services/product.service';

@Component({
  selector: 'app-product',
  standalone: true,
  imports: [CommonModule,FormsModule,ReactiveFormsModule],
  templateUrl: './product.component.html',
  styleUrl: './product.component.css'
})
export class ProductComponent implements OnInit{
  all_product_data:any;
  addEditProductForm!:FormGroup;
  addEditProduct:boolean = false;
  popup_header!:string;
  add_product!:boolean;
  edit_product!:boolean;
  product_data:any;
  single_product_data:any;
  product_detail!:Product;
  edit_product_id:any;

  constructor(private fb: FormBuilder,private router: Router,private productService: ProductService){}

  ngOnInit(): void {
      this.addEditProductForm = this.fb.group({
        name: ['',Validators.required],
        uploadPhoto: ['',Validators.required],
        productDesc: ['',Validators.required],
        mrp: ['',Validators.required],
        discount: ['',Validators.required],
        status: ['',Validators.required]
      })
      this.getAllProduct();
  }

  get rf(){
    return this.addEditProductForm.controls;
  }

  getAllProduct(){
    this.productService.allProducts().subscribe(data => {
      this.all_product_data = data;
      console.log(this.all_product_data)
    },error => console.log("Error-->",error))
  }

  addProductPopup(){
    this.add_product = true;
    this.edit_product = false;
    this.popup_header = "Add New Product";
    this.addEditProductForm.reset();
  }

  addNewProduct(){
    this.addEditProduct = true;
    if(this.addEditProductForm.invalid){
      return;
    }
    this.product_data = this.addEditProductForm.value;
    this.product_detail = {
      id:0,
      name: this.product_data.name,
      uploadPhoto: this.product_data.uploadPhoto,
      productDesc: this.product_data.productDesc,
      mrp: this.product_data.mrp,
      discount: this.product_data.discount,
      status: this.product_data.status,
    }

    this.productService.addNewProduct(this.product_detail).subscribe(data => {
      console.log(data)
      this.getAllProduct();
    },error => console.log("Error-->",error))
  }

  editProductPopup(id:any){
    this.add_product = false;
    this.edit_product = true;
    this.popup_header = "Edit Product";
    this.addEditProductForm.reset();
    this.productService.singleProduct(id).subscribe(data =>{
      this.single_product_data = data;
      console.log("single_product_data-->",this.single_product_data);
      this.edit_product_id = data.id;
      this.addEditProductForm.setValue({
        name: this.single_product_data.name,
        uploadPhoto: this.single_product_data.uploadPhoto,
        productDesc: this.single_product_data.productDesc,
        mrp: this.single_product_data.mrp,
        discount: this.single_product_data.discount,
        status: this.single_product_data.status,
      })
    },error => console.log("Error-->",error))
  }

  updateProduct(){
    this.addEditProduct = true;
    if(this.addEditProductForm.invalid){
      return
    }
    this.product_data = this.addEditProductForm.value;
    this.product_detail = {
      id:0,
      name: this.product_data.name,
      uploadPhoto: this.product_data.uploadPhoto,
      productDesc: this.product_data.productDesc,
      mrp: this.product_data.mrp,
      discount: this.product_data.discount,
      status: this.product_data.status,
    }
    this.productService.updateProduct(this.edit_product_id,this.product_detail).subscribe(data =>{
      this.getAllProduct();
    },error => console.log("Error-->",error))
  }

  deleteProduct(id:any){
    let conf = confirm("Are you sure to delete")
    if(conf){
      this.productService.deleteProduct(id).subscribe(data => {
        alert("Product Deleted");
        this.getAllProduct();
      },error => console.log("Error-->",error))
    }
  }


}

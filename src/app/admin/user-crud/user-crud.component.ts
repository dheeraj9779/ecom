import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AdminService } from '../services/admin.service';
import { User } from '../../core/Model/object-model';
declare var $: any;

@Component({
  selector: 'app-user-crud',
  standalone: true,
  imports: [CommonModule,ReactiveFormsModule,FormsModule],
  templateUrl: './user-crud.component.html',
  styleUrl: './user-crud.component.css'
})
export class UserCrudComponent implements OnInit{

  all_user_data:any;
  single_user_data:any;
  addEditUserForm!:FormGroup;
  user_detail!:User;
  user_reg_data:any;
  edit_user_id:any;
  upload_file_name!:string;
  addEditUser:boolean = false;
  add_user:boolean = false;
  edit_user:boolean = false;
  popup_header!:string;
  signInFormValue:any = {}

  constructor(private fb:FormBuilder,private router:Router,private adminService: AdminService){

  }

  ngOnInit(): void {
    this.getAllUser()
    this.addEditUserForm = this.fb.group({
      name: ['',Validators.required],
      mobile: ['',Validators.required],
      age: ['',Validators.required],
      dob: ['',Validators.required],
      email: ['',Validators.required],
      password: ['',Validators.required],
      addLine1: ['',Validators.required],
      addLine2: ['',Validators.required],
      city: ['',Validators.required],
      state: ['',Validators.required],
      pincode: ['',Validators.required],
      language: ['',Validators.required],
      gender: ['',Validators.required],
      aboutYou: ['',Validators.required],
      uploadPhoto: ['',Validators.required],
      agreetc: ['',Validators.required],
      role: ['',Validators.required]
    })
  }

  getAllUser(){
    this.adminService.allUserDashboardData().subscribe(data => {
      this.all_user_data = data;
    },error => {
      console.log("My Error",error)
    })
  }

  get rf(){
    return this.addEditUserForm.controls;
  }

  addUserPopup(){
    this.edit_user = false;
    this.add_user = true;
    this.popup_header = "Add New User";
    this.addEditUserForm.reset();
  }

  addUser(){
    this.addEditUser = true;
    if(this.addEditUserForm.invalid){
      alert("Error!! :-)\n\n" + JSON.stringify(this.addEditUserForm.value))
    }
    this.user_reg_data = this.addEditUserForm.value;
    this.user_detail = {
      name: this.user_reg_data.name,
      age: this.user_reg_data.age,
      dob: this.user_reg_data.dob,
      mobile: this.user_reg_data.mobile,
      email: this.user_reg_data.email,
      password: this.user_reg_data.password,
      address: {
        id: 0,
        addLine1: this.user_reg_data.addLine1,
        addLine2: this.user_reg_data.addLine2,
        city: this.user_reg_data.city,
        state: this.user_reg_data.state,
        pincode: this.user_reg_data.pincode,
      },
      gender: this.user_reg_data.gender,
      language: this.user_reg_data.language,
      aboutYou: this.user_reg_data.aboutYou,
      agreetc: this.user_reg_data.agreetc,
      uploadPhoto: this.user_reg_data.uploadPhoto,
      role: this.user_reg_data.role,
    }
    this.adminService.addUser(this.user_detail).subscribe(data => {
      this.addEditUserForm.reset();
      this.getAllUser();
      $('#myModal').modal('toggle');

    },error => {
      console.log(error)
    }
  )
  }

  editUserPopup(user_id:any){
    this.edit_user_id = user_id;
    this.edit_user = true;
    this.add_user = false;
    this.popup_header = "Edit User";
    this.adminService.singleUser(user_id).subscribe(data => {
      this.single_user_data = data;
      this.upload_file_name = this.single_user_data.uploadPhoto

    this.addEditUserForm.setValue({
      name: this.single_user_data?.name,
      age: this.single_user_data?.age,
      dob: this.single_user_data?.dob,
      mobile: this.single_user_data?.mobile,
      email: this.single_user_data?.email,
      password: this.single_user_data?.password,
      addLine1: this.single_user_data.address?.addLine1,
      addLine2: this.single_user_data.address?.addLine2,
      city: this.single_user_data.address?.city,
      state: this.single_user_data.address?.state,
      pincode: this.single_user_data.address?.pincode,
      gender: this.single_user_data?.gender,
      language: this.single_user_data?.language,
      aboutYou: this.single_user_data?.aboutYou,
      agreetc: this.single_user_data?.agreetc,
      uploadPhoto: '',
      role: this.single_user_data?.role,
    });
  },error => {console.log("Error-->",error)})
  }

  updateUser(){
    if(this.addEditUserForm.invalid){
      alert("Error!! :-)\n\n" + JSON.stringify(this.addEditUserForm.value))
    }
    this.user_reg_data = this.addEditUserForm.value;
    this.user_detail = {
      name: this.user_reg_data.name,
      age: this.user_reg_data.age,
      dob: this.user_reg_data.dob,
      mobile: this.user_reg_data.mobile,
      email: this.user_reg_data.email,
      password: this.user_reg_data.password,
      address: {
        id: 0,
        addLine1: this.user_reg_data.addLine1,
        addLine2: this.user_reg_data.addLine2,
        city: this.user_reg_data.city,
        state: this.user_reg_data.state,
        pincode: this.user_reg_data.pincode,
      },
      gender: this.user_reg_data.gender,
      language: this.user_reg_data.language,
      aboutYou: this.user_reg_data.aboutYou,
      agreetc: this.user_reg_data.agreetc,
      uploadPhoto: (this.user_reg_data.uploadPhoto == "" ? this.upload_file_name : this.user_reg_data.uploadPhoto),
      role: this.user_reg_data.role,
    }
    this.adminService.updateUser(this.edit_user_id,this.user_detail).subscribe(data => {
      this.addEditUserForm.reset();
      this.getAllUser();
      $('#myModal').modal('toggle');

    },error => {
      console.log(error)
    })
  }

  deleteUser(user_id:any){
    this.adminService.deleteUser(user_id).subscribe(data => {
      this.getAllUser()
    },error => {console.log("Error-->",error)})
  }
}

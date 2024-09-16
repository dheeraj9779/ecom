import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { User } from '../core/Model/object-model';
import { Router } from '@angular/router';
import { UserService } from '../shared/services/user.service';

@Component({
  selector: 'app-user-profile',
  standalone: true,
  imports: [CommonModule,FormsModule,ReactiveFormsModule],
  templateUrl: './user-profile.component.html',
  styleUrl: './user-profile.component.css'
})
export class UserProfileComponent implements OnInit{
  userProfileForm!:FormGroup;
  userProfile:boolean = false;
  user_id!:number;
  user_data:any;
  user_update_data:any;
  user_detail:any;
  user_profile_pic:any;
  user_language:any;
  user_role:any;
  constructor(private fb:FormBuilder,private router:Router,private userService: UserService){

  }

  ngOnInit(): void {
    this.user_id = Number(sessionStorage.getItem("user_session_id"));
    this.userProfileForm = this.fb.group({
      name: ['',Validators.required],
      mobile: ['',Validators.required],
      age: ['',Validators.required],
      dob: ['',Validators.required],
      email: ['',Validators.required],
      password: ['',Validators.required],
      addLine1: ['',Validators.required],
      addLine2: [],
      city: ['',Validators.required],
      state: ['',Validators.required],
      pincode: ['',Validators.required],
      language: ['',Validators.required],
      gender: ['',Validators.required],
      aboutYou: ['',Validators.required],
      uploadPhoto: ['',Validators.required],
    })
    this.editUserData(this.user_id)
  }

  get rf(){
    return this.userProfileForm.controls;
  }


  editUserData(user_id:any){
    this.userService.getUserData(user_id).subscribe(data =>{
      this.user_data = data;
      this.user_profile_pic = this.user_data.uploadPhoto;
      this.user_language = this.user_data.language
      this.user_role = this.user_data.role;
      this.userProfileForm.setValue({
        name: this.user_data?.name,
        age: this.user_data?.age,
        dob: this.user_data?.dob,
        mobile: this.user_data?.mobile,
        email: this.user_data?.email,
        password: this.user_data?.password,
        addLine1: this.user_data.address?.addLine1,
        addLine2: this.user_data.address?.addLine2,
        city: this.user_data.address?.city,
        state: this.user_data.address?.state,
        pincode: this.user_data.address?.pincode,
        gender: this.user_data?.gender,
        language: this.user_data?.language,
        aboutYou: this.user_data?.aboutYou,
        uploadPhoto: '',

      });
    },error =>{error})
  }

  updateProfile(user_id:any){
    this.userProfile = true;
    if(this.userProfileForm.invalid){
      return;
    }
    this.user_update_data = this.userProfileForm.value;
    this.user_detail = {
      name: this.user_update_data?.name,
      age: this.user_update_data?.age,
      dob: this.user_update_data?.dob,
      mobile: this.user_update_data?.mobile,
      email: this.user_update_data?.email,
      password: this.user_update_data?.password,
      addLine1: this.user_update_data.address?.addLine1,
      addLine2: this.user_update_data.address?.addLine2,
      city: this.user_update_data.address?.city,
      state: this.user_update_data.address?.state,
      pincode: this.user_update_data.address?.pincode,
      gender: this.user_update_data?.gender,
      language: this.user_update_data?.language,
      aboutYou: this.user_update_data?.aboutYou,
      agreetc: this.user_update_data?.agreetc,
      uploadPhoto: (this.user_update_data.uploadPhoto == "" ? this.user_profile_pic : this.user_update_data.uploadPhoto),
      role: this.user_update_data?.role,
    }
    this.userService.editUserData(this.user_id,this.user_detail).subscribe(data => {
      alert("Profile Update Successfull !")
      if(this.user_role == 'Admin'){
        this.router.navigate(['admin-dashboard'])
      }
      else if(this.user_role == 'seller'){
        this.router.navigate(['seller-dashboard'])
      }
      else if(this.user_role == 'buyer'){
        this.router.navigate(['buyer-dashboard'])
      }
    },error => {console.log(error)})
  }

}

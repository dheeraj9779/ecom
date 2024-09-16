import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { User } from '../../core/Model/object-model';
import { LoginSignupService } from '../../shared/services/login-signup.service';

@Component({
  selector: 'app-signin-signup',
  standalone: true,
  imports: [CommonModule,RouterLink,ReactiveFormsModule,FormsModule],
  templateUrl: './signin-signup.component.html',
  styleUrl: './signin-signup.component.css'
})
export class SigninSignupComponent implements OnInit{
  regForm:boolean = false;
  signUpForm!:FormGroup;
  signInForm!:FormGroup;
  signUpSubmitted:boolean = false;
  href:string = '';
  user_data:any;
  user_detail!:User;
  user_reg_data:any;
  signInFormValue:any = {};

  constructor(private formBuilder:FormBuilder, private router:Router, private loginService:LoginSignupService){

  }

  ngOnInit():void{
    this.href = this.router.url;
    if(this.href == "/sign-up"){
      this.regForm = true;
    }else if(this.href == "/sign-in"){
      this.regForm = false;
    }

    this.signUpForm = this.formBuilder.group({
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
      agreetc: ['',Validators.required],
      role: ['',Validators.required]
    })
  }

  get rf(){
    return this.signUpForm.controls;
  }

  onSubmitSignUp(){
    this.signUpSubmitted = true;
    if(this.signUpForm.invalid){
      return
    }
    this.user_reg_data = this.signUpForm.value;

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
    console.log(this.user_detail)
    this.loginService.userRegister(this.user_detail).subscribe((data) => {
      console.log(data)
      alert("user register successful");
      this.router.navigate(['sign-in'])
    })
  }

  onSubmitLogIn(){
    this.loginService.adminLogin(this.signInFormValue.userEmail,this.signInFormValue.userPassword).subscribe((data) => {
        this.user_data = data;
        if(this.user_data.length == 1){
          if(this.user_data[0].role == "seller"){
            sessionStorage.setItem("user_session_id",this.user_data[0].id)
            sessionStorage.setItem("role",this.user_data[0].role)
            this.router.navigateByUrl('/seller-dashboard');
          }else if(this.user_data[0].role == "buyer"){
            sessionStorage.setItem("user_session_id",this.user_data[0].id)
            sessionStorage.setItem("role",this.user_data[0].role)
            this.router.navigate(['buyer-dashboard']);
          }
          // else if(this.user_data[0].role == "Admin"){
          //   sessionStorage.setItem("user_session_id",this.user_data[0].id)
          //   sessionStorage.setItem("role",this.user_data[0].role)
          //   this.router.navigate(['admin-dashboard']);
          // }
          else{
            alert("Invalid credential")
          }
        }
        else{
          alert("invalid")
        }
    },error => {
      console.log(error)
    }
  )

  }

}

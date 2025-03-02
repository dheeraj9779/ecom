import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AdminService } from '../services/admin.service';
import { Router } from '@angular/router';
import { LoginSignupService } from '../../shared/services/login-signup.service';

@Component({
  selector: 'app-admin-login',
  standalone: true,
  imports: [CommonModule,ReactiveFormsModule,FormsModule],
  templateUrl: './admin-login.component.html',
  styleUrl: './admin-login.component.css'
})
export class AdminLoginComponent implements OnInit{

  signInFormValue:any = {}
  user_data:any;

  constructor(private router: Router,private adminService: AdminService,private logInService: LoginSignupService){

  }

  ngOnInit(): void {

  }

  onSubmitSignIn(){
    this.logInService.adminLogin(this.signInFormValue.userEmail,this.signInFormValue.userPassword).subscribe(data => {
      this.user_data = data;
      if(this.user_data.length == 1){
        sessionStorage.setItem("user_session_id",this.user_data[0].id)
        sessionStorage.setItem("role",this.user_data[0].role)
        this.router.navigate(['admin-dashboard'])
      }
      else{
        alert("Invalid Response")
      }
      console.log(this.user_data)
    },error => {
      console.log("My error",error)
    }
  )
  }

}

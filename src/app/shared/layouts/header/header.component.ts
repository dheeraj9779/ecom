import { CommonModule } from '@angular/common';
import { Component, DoCheck, OnInit } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink,CommonModule,RouterLinkActive],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent implements OnInit,DoCheck{
  logged_in:boolean =false;
  user_role!:any;

  constructor(private router: Router){}

  ngOnInit(): void {

  }

  ngDoCheck(): void {
    this.user_role = sessionStorage.getItem('role');
    const user_session_id = sessionStorage.getItem('user_session_id')
    if(user_session_id){
      this.logged_in = true;
    }
  }

  logout(){
    sessionStorage.removeItem('user_session_id');
    sessionStorage.removeItem('role');
    this.logged_in = false;
    this.router.navigate(['sign-in'])
  }

}

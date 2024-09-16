import { Component, HostListener } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FooterComponent } from "./shared/layouts/footer/footer.component";
import { HeaderComponent } from './shared/layouts/header/header.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HeaderComponent, FooterComponent,CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  screenHeight:any;
  screenWidth:any;
  footerMaxheight!:number;
  title = 'angularEcom';

  constructor(){
    this.getScreenSize(event)
  }

  @HostListener('window:resize',['$event'])
  getScreenSize(event:any){
    this.screenHeight = window.innerHeight;
    this.screenWidth = window.innerWidth;
    this.footerMaxheight = this.screenHeight -180;
  }

}

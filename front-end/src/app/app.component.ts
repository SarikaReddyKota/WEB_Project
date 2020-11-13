import { LoginService } from './services/login.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'phase1';
  check;
  isLoggedin: boolean = false;

  constructor(private router: Router, private loginService: LoginService) { }

  ngOnInit() {
    // this.check = sessionStorage.getItem("res-session");
    // console.log('check in nav bar.....', this.check);
    // if(this.check != undefined) { 
    //   this.isLoggedin = true;
    // } else { 
    //   this.isLoggedin = false;
    // }

    this.loginService.update.subscribe(res => this.isLoggedin = res);
    //console.log('adsasdsadasd', this.isLoggedin);
  }



  logOut() {
    sessionStorage.clear();
    this.isLoggedin = false;
    this.router.navigate['/login'];
   }
}

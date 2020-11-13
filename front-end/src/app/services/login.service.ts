import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import {BehaviorSubject} from 'rxjs';
import { Router } from '@angular/router';
import { environment } from './../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  serverUrl;
  constructor(private http: HttpClient, private router: Router) {
    this.serverUrl = environment.serverUrl;
    //console.log('url############',this.serverUrl);
   } 

  private userLoggedin = new BehaviorSubject<boolean>(false);
  update = this.userLoggedin.asObservable();

  loggedIn(value){
    this.userLoggedin.next(value); 
  }

  login(userData) {
    return this.http.post(this.serverUrl + '/login',userData);
  }

  logOut() {
    sessionStorage.removeItem("res-session");
    this.router.navigate(['/login']);
  }
}

import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { environment } from './../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {
  serverUrl;
  constructor(private http: HttpClient) {
    this.serverUrl = environment.serverUrl;
   } 

  saveUser(registerData) { 
    return this.http.post(this.serverUrl+'/register',registerData);
  }
}

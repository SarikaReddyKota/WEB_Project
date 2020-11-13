import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { environment } from './../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UploadService {
  serverUrl;
  constructor(private http: HttpClient) {
    this.serverUrl = environment.serverUrl;
   }

  uploadResume(data) {
    //let userId = sessionStorage.getItem("res-session");
    // let uploadData = {
    //   userId : sessionStorage.getItem("res-session"),
    //   data : data
    // }
    return this.http.post<any>(this.serverUrl + '/uploadfile', data);
  }
}

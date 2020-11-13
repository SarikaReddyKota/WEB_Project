import { environment } from './../../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import {BehaviorSubject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CarrerService {
  serverUrl;
  constructor(private http: HttpClient) { 
    this.serverUrl = environment.serverUrl;
  }

  private carrerSearchValue = new BehaviorSubject<any>('United States');
  updatedcarrerSearchValue = this.carrerSearchValue.asObservable();
   
   updatecarrerSearchValue(data){
     this.carrerSearchValue.next(data); 
   }

   private carrerJobLink = new BehaviorSubject<any>('');
   updatedcarrerJobLink = this.carrerJobLink.asObservable();
   
   updatecarrerJobLink(data){
     this.carrerJobLink.next(data); 
   }


  getCarrersData(value) { 
    let body = { data : value };
    return this.http.post(this.serverUrl + '/carrer/stats', body);
  }

  
  getTopCompanies(value) { 
    let body = { data : value };
    return this.http.post(this.serverUrl + '/carrer/topcompanies', body);
  }

  getTopSalaries(value) { 
    let body = { data : value };
    return this.http.post(this.serverUrl + '/carrer/topsalaries', body);
  }
}

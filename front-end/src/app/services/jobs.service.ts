import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import {BehaviorSubject} from 'rxjs';
import { environment } from './../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class JobsService {
  serverUrl;
  constructor(private http: HttpClient) {
    this.serverUrl = environment.serverUrl;
   }

  private jobsFormData = new BehaviorSubject<any>({});
  updatedJobsFormData = this.jobsFormData.asObservable();
   
   updateFormData(data){
     this.jobsFormData.next(data); 
   }

  getResumeTechnologies(data){
    //console.log('data....', data);
    let body = { id : data };
    return this.http.post(this.serverUrl + '/jobs/technologies',body);
  }

  getJobs() { 
    return this.http.get(this.serverUrl + '/jobs');
  }

  getCustomJobs(data) {
    let body = { url : data };
    return this.http.post(this.serverUrl + '/jobs/custom',body);
  }
  getCarrersData(value) { 
    let body = { data : value };
    return this.http.post(this.serverUrl + '/carrer/stats', body);
  }
  getJobDescription(data) { 
    //console.log('data in service file', data);
    let body = { link : data };
    return this.http.post(this.serverUrl + '/jobs/description',body);
  }
}

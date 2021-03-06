import { CarrerService } from './../services/carrer.service';
import { JobDescriptionComponent } from './../job-description/job-description.component';
import { Component, OnInit, Input } from '@angular/core';
import { JobsService } from './../services/jobs.service';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material';
CarrerService

@Component({
  selector: 'app-jobs',
  templateUrl: './jobs.component.html',
  styleUrls: ['./jobs.component.css']
})

export class JobsComponent implements OnInit {
  showdiv=true;
  showcareer=true;
  jobsData;
  jobDescription;
  resumeTechnologies;
  url;
  searchTitle;
  interval: any;
  careerOpenings: Object;
  //@Input('formValue') formValue: any;

  constructor(private jobsService : JobsService, private router: Router, public dialog: MatDialog, private carrerService: CarrerService) { }

  ngOnInit() {
    let id = sessionStorage.getItem("res-session");
    

    this.carrerService.updatedcarrerJobLink.subscribe(link => {
      
      if (link == '') {
        
        this.jobsService.getResumeTechnologies(JSON.parse(id).token).subscribe( res => {
          if(res[0]){
            this.resumeTechnologies = res[Object.keys(res).length - 1].technologies;
          if(this.resumeTechnologies.length != 0) {
            this.url = 'https://www.indeed.com/jobs?q=';
            this.resumeTechnologies.forEach(item =>{
              this.url += '+' + item;
            })
            this.jobsService.getCustomJobs(this.url).subscribe(jobs => {
              this.jobsData = jobs;
              this.searchTitle = "Recommended Jobs";
              if(this.jobsData.length == 0) {
                this.getDefaultJobs();
              }else{
                this.jobsService.getCarrersData('MO').subscribe( res => {
                  this.careerOpenings = res;
                  console.log(this.careerOpenings)
            
                });
              }
            })
          } else {
            this.getDefaultJobs();
          }
          
          } else {
            this.getDefaultJobs();
          }
        })
      } else {
        
        this.jobsService.getCustomJobs(link).subscribe(res => {
          this.searchTitle = "Recommended Jobs";
          this.jobsData = res;
        })
      }
    })

    this.jobsService.updatedJobsFormData.subscribe(res => {
      
      if(res.jobKeywords != undefined) {
        this.getSearchedJobs(res);
      }
    })

  }
  truncatesummary(data){
   return data = ((data.length>30) ? data.slice(0,130)+'...' : data);
    
  }
  gotoTop() {
    this.showdiv = !this.showdiv;
    this.interval = setTimeout(() => {
      window.scroll({
        top: 1500,
        left: 0,
        behavior: "smooth"
      });
    }, 100);
  }

  gotoShowCareer() {
    this.showcareer = !this.showcareer;
    this.interval = setTimeout(() => {
      window.scroll({
        top: 3000,
        left: 0,
        behavior: "smooth"
      });
    }, 100);
  }
  getDefaultJobs() {
    this.jobsService.getJobs().subscribe(res => {
      this.searchTitle = "Recommended Jobs";
      this.jobsData = res;
    })
    this.jobsService.getCarrersData('MO').subscribe( res => {
      this.careerOpenings = res;
      console.log(this.careerOpenings)

    });
  }

  getSearchedJobs(data) {
    this.searchTitle = "Searched Jobs";
    this.url = 'https://www.indeed.com/jobs?q=';
    let searchString = data.jobKeywords.toString().split(", ");
    
    this.url += searchString;
    if(data.location != undefined) {
      this.url += '&l=' + data.location;
    }
    
    this.jobsService.getCustomJobs(this.url).subscribe(res => {
      
      this.jobsData = res;
    })

    if(data){
      data.location= data.location? data.location:"MO" ;
       console.log(data.location);
      this.jobsService.getCarrersData(data.location).subscribe( res => {
        this.careerOpenings = res;
        console.log(this.careerOpenings)
  
      });
    }else{
      this.jobsService.getCarrersData("MO").subscribe( res => {
        this.careerOpenings = res;
        console.log(this.careerOpenings)
  
      });
    }
   

    
  }
  openRespectiveJobs(link) {
    this.carrerService.updatecarrerJobLink(link);
  } 
  getDescription(job) {
    
    this.jobsService.getJobDescription(job.link).subscribe( res => {
      this.jobDescription = res;
      
      job['description'] = this.jobDescription

      let dialogRef = this.dialog.open(JobDescriptionComponent, {
        panelClass: 'my-class',
        height: '500px',
        width: '1000px',
        data: job
      });

      dialogRef.afterClosed().subscribe(result => {
        
      });
    })
  }

}

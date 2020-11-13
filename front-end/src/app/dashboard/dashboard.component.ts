import { CarrerService } from './../services/carrer.service';
import { JobsService } from "./../services/jobs.service";
import { LoginService } from "./../services/login.service";
import { DialogComponent } from "./../dialog/dialog.component";
import { Component, OnInit, Inject } from "@angular/core";
import { MatDialog } from "@angular/material";
import { Router } from "@angular/router";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";


@Component({
  selector: "app-dashboard",
  templateUrl: "./dashboard.component.html",
  styleUrls: ["./dashboard.component.css"]
})
export class DashboardComponent implements OnInit {
  jobsForm: FormGroup;
  resumeFile: File | null;
  rawData: string;
  isLoggedin;
  check;
  jobsFormValue;
  formType: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    public dialog: MatDialog,
    private loginService: LoginService,
    private jobsService: JobsService,
    private carrerService: CarrerService
  ) {}

  ngOnInit() {
    // this.formType = false;
    // console.log('window location...........',window.location.pathname,this.formType);
    // if (window.location.pathname == '/dashboard/carrer') {
    //   this.formType = true;
    // }
    this.jobsForm = this.formBuilder.group({
      jobKeywords: ["", [Validators.required]],
      //  email: ['', [Validators.required, Validators.email]],
      location: ["", [Validators.required]]
    });
    this.check = sessionStorage.getItem("res-session");
    //console.log("check in nav bar.....", this.check);
    this.loginService.loggedIn(this.isLoggedin);
  }

  onClick(){
    this.router.navigate(['dashboard']);
  }

  findJobs() {
    // console.log('for value', this.jobsForm.value);
    this.jobsFormValue = this.jobsForm.value;
    this.jobsService.updateFormData(this.jobsFormValue);
  }

  upload() {
    let dialogRef = this.dialog.open(DialogComponent, {
      width: "400px",
      data: { data: this.resumeFile }
    });

    dialogRef.afterClosed().subscribe(result => {
      // console.log('The dialog was closed...........',result);
      this.rawData = result;
    });
  }

  logOut() {
    this.loginService.logOut();
  }

  carrer() {
    //this.formType = true;
    this.router.navigate(["dashboard/carrer"]);
  }

  searchCarrer(value) {
    //console.log('Search value @@@@@@@@@@@@@ updatecarrerSearchValue', value);
    this.carrerService.updatecarrerSearchValue(value);
  }

  ngDoCheck() {
    if(window.location.pathname == '/dashboard/carrer') {
      this.formType = true;
    } else {
      this.formType = false;
    }
  }
}

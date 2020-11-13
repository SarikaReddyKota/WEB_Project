import { LoginService } from './../services/login.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from  '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  isSubmitted: boolean  =  false;
  inValidUser: boolean = false;
  errorMessage: string;

  constructor(private formBuilder: FormBuilder, private loginService: LoginService, private router: Router ) { }

  ngOnInit() {
    this.loginForm  =  this.formBuilder.group({
      username: ['', [Validators.required]],
    //  email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
  });
  }

  get f() { return this.loginForm.controls; }

  login(){
    this.isSubmitted = true;
    if(this.loginForm.invalid){
      return;
    } else {
      //console.log('valid form value.....',this.loginForm.value);
      this.loginService.login(this.loginForm.value).subscribe( res => {
        //console.log('Success dashboard', res);
        if(res) {
          sessionStorage.setItem('res-session', JSON.stringify(res));
          this.router.navigate(['dashboard']);
        }
      }, err => {
        //console.log('Invalid user credentials', err);
        this.inValidUser = true;
        this.errorMessage = err.error.message;
      });
    }
  }

}

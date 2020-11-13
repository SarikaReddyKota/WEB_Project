import { RegisterService } from './../services/register.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  isSubmitted  =  false;
  registrationForm: FormGroup;
  isUsernameValid: boolean = false;

  constructor(private formBuilder: FormBuilder,  private router: Router, private registerService: RegisterService) { }

  ngOnInit() {
    this.registrationForm = this.formBuilder.group({
      username: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', Validators.required]
    },
    {validator:  this.MustMatch('password', 'confirmPassword')});
  }

   MustMatch(controlName: string, matchingControlName: string) {
    return (formGroup: FormGroup) => {
        const control = formGroup.controls[controlName];
        const matchingControl = formGroup.controls[matchingControlName];

        if (matchingControl.errors && !matchingControl.errors.mustMatch) {
            // return if another validator has already found an error on the matchingControl
            return;
        }

        // set error on matchingControl if validation fails
        if (control.value !== matchingControl.value) {
            matchingControl.setErrors({ mustMatch: true });
        } else {
            matchingControl.setErrors(null);
        }
    }
}

  get f() { return this.registrationForm.controls; }

  onSubmit(){
    this.isSubmitted = true;
    if(this.registrationForm.invalid){
      return;
    } else {
      this.registerService.saveUser(this.registrationForm.value).subscribe( res => {
        //console.log('Response from register......',res);
        this.router.navigate(['login']);
      }, err => {
        //console.log('Err Response from register......',err);
        this.isUsernameValid = true;
      })
    }
    //alert('SUCCESS!! :-)\n\n' + JSON.stringify(this.registrationForm.value))
  }
}

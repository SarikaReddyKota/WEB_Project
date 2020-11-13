import { UploadService } from './../services/upload.service';
import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
// import {HttpClientModule, HttpClient, HttpRequest, HttpResponse, HttpEventType} from '@angular/common/http';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css']
})
export class DialogComponent implements OnInit {

  uploadForm: FormGroup;
  myFormData:FormData;
  percentDone: number = 0;
  uploadSuccess;
  resumeData;
  uploadMessage;

  constructor(private formBuilder: FormBuilder, private uploadService: UploadService, public dialogRef: MatDialogRef<DialogComponent>, @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit() {
    this.uploadForm = this.formBuilder.group({
      profile: ['']
    });
  }

  onFileSelect(event) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.uploadForm.get('profile').setValue(file);
    }
  }

  onSubmit() {
    const formData = new FormData();
    let userId = sessionStorage.getItem("res-session");
    
    formData.append('userId', JSON.parse(userId).token);
    formData.append('profile', this.uploadForm.get('profile').value);

    this.uploadService.uploadResume(formData).subscribe(res => { 
        this.resumeData = JSON.stringify(res);
        //console.log('response data........', this.resumeData);
      },err => {
        this.resumeData = JSON.stringify(err);
        //console.log('error data........',err.status);
        if(err.status == 200)
          this.uploadMessage = "Resume Uploaded Successfully!";
        else
          this.uploadMessage = "Error in Uploading the Resume";
      });

    // this.http.post<any>('http://localhost:3000/uploadfile', formData).subscribe(
    //   (res) => {
        
    //     this.resumeData = JSON.stringify(res);
    //     console.log('response data........', this.resumeData);
    //   },
    //   (err) => console.log(err)
    // );
  }

  uploadFiles(files: File) {
    //console.log('input file', files);
    //console.log('form data.....', this.myFormData);
  }

  onNoClick(file): void {
    
    //console.log('file data..........', file);
    this.dialogRef.close();
  }

  // uploadAndProgress(files: File[]){
  //   console.log(files)
  //   var formData = new FormData();
  //   Array.from(files).forEach(f => formData.append('file',f))
    
  //   this.http.post('https://file.io', formData, {reportProgress: true, observe: 'events'})
  //     .subscribe(event => {
  //       if (event.type === HttpEventType.UploadProgress) {
  //         this.percentDone = Math.round(100 * event.loaded / event.total);
  //       } else if (event instanceof HttpResponse) {
  //         console.log('event..........', event);
  //         this.uploadSuccess = true;
  //       }
  //   });
  // }
}

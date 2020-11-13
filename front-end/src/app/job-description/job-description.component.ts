import { Component, OnInit, Inject } from '@angular/core';
import { VERSION, MatDialogRef, MatDialog, MatSnackBar, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-job-description',
  templateUrl: './job-description.component.html',
  styleUrls: ['./job-description.component.css']
})
export class JobDescriptionComponent implements OnInit {

  jobData;

  constructor(@Inject(MAT_DIALOG_DATA) private data: any,private dialogRef: MatDialogRef<JobDescriptionComponent>) { 
    //console.log('dialog data.......',data);
    if (data) {
      this.jobData = data ;
    }
    //this.dialogRef.updateSize('300vw','300vw');
  }

  ngOnInit() {
  }

}

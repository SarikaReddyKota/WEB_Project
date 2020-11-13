import { AuthGuard } from './auth.guard';
import { RegisterService } from './services/register.service';
import { LoginService } from './services/login.service';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import {MatTabsModule} from '@angular/material/tabs';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { ReactiveFormsModule } from '@angular/forms';
import { DashboardComponent } from './dashboard/dashboard.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatDialogModule } from '@angular/material/dialog';
import { DialogComponent } from './dialog/dialog.component';
import { ngfModule, ngf } from "angular-file";
import { MatCardModule } from '@angular/material/card';
import { JobsComponent } from './jobs/jobs.component';
import { JobDescriptionComponent } from './job-description/job-description.component';
import { MatIconModule } from '@angular/material/icon';
import { CarrerComponent } from './carrer/carrer.component';
import { ChartsModule } from 'ng2-charts/ng2-charts';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    DashboardComponent,
    DialogComponent,
    JobsComponent,
    JobDescriptionComponent,
    CarrerComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatDialogModule,
    ngfModule,
    MatCardModule,
    MatIconModule,
    MatTabsModule, 
    ChartsModule
  ],
  entryComponents: [DialogComponent, JobDescriptionComponent],
  providers: [
    LoginService,
    RegisterService,
    AuthGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

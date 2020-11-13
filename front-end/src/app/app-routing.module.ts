import { CarrerComponent } from "./carrer/carrer.component";
import { JobDescriptionComponent } from "./job-description/job-description.component";
import { JobsComponent } from "./jobs/jobs.component";
import { AuthGuard } from "./auth.guard";
import { DashboardComponent } from "./dashboard/dashboard.component";
import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { LoginComponent } from "./login/login.component";
import { RegisterComponent } from "./register/register.component";

const routes: Routes = [
  { path: "login", component: LoginComponent },
  { path: "register", component: RegisterComponent },
  {
    path: "dashboard",
    component: DashboardComponent,
    canActivate: [AuthGuard],
    children: [
      { path: "carrer", component: CarrerComponent},
      { path: "", component: JobsComponent},
     // { path: "jobDescription", component: JobDescriptionComponent}
    ]
  },
  { path: "**", redirectTo: "login" },
  { path: "", component: LoginComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}

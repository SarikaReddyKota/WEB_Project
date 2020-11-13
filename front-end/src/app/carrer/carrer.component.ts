import { CarrerService } from './../services/carrer.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Chart, ChartDataSets, ChartOptions } from 'chart.js';
import { Color } from 'ng2-charts';
import { Router } from '@angular/router';

@Component({
  selector: 'app-carrer',
  templateUrl: './carrer.component.html',
  styleUrls: ['./carrer.component.css']
})
export class CarrerComponent implements OnInit {

  openings = [];
  carrerOpenings;
  topCompanies;
  topSalaries;
  Values;
  keeys;
  searchValue;
  salariesChart;
  salariesChartData = [];
  public barChartOptions: any = {
    scaleShowVerticalLines: false,
    responsive: true
  };
  public barChartLabels: string[] = [];
  public barChartType: string = 'bar';
  public barChartLegend: boolean = true;
  showChart = false;

  public barChartData: any[] = [];

  public lineChartData: ChartDataSets[] = [
    { data: [], label: 'High Paid Salaries' },
  ];
  public lineChartLabels: string[] = [];
  public lineChartOptions: (ChartOptions & { annotation: any }) = {
    responsive: true,
  };
  public lineChartColors: Color[] = [
    {
      //borderColor: 'black',
      backgroundColor: 'rgba(255,0,0,0.4)',
    },
  ];
  public lineChartLegend = true;
  public lineChartType = 'line';

  constructor(private carrerService: CarrerService, private router: Router) { }

  ngOnInit() {

    this.carrerService.updatedcarrerSearchValue.subscribe(res => {
      //console.log("Line Chart Data@@@@.......", this.lineChartData);
      this.searchValue = res;
      this.getCarrersData();
    });

  }

  openingsChart() {
    this.barChartData = [
      { data: this.openings, label: 'Job Openings' }
    ];
    //console.log('data for charts@@@@@@@@@@@', this.barChartData);
    this.showChart = true;
  }

  getCarrersData() {
    this.carrerService.getCarrersData(this.searchValue).subscribe( res => {
      this.carrerOpenings = res;
      //console.log('This is carrers data.......', res);
      //var matches = str.match(/(\d+)/); 
      this.openings = [];
      this.barChartLabels = [];
      this.carrerOpenings.forEach(element => {
        let item = element.openings.match(/(\d+)/);
        //console.log('This is openings data.......@@@@#######', item);
        this.openings.push(item[0]);
        this.barChartLabels.push(element.jobTitle);
      });
      this.barChartData = [
        { data: this.openings, label: 'Job Openings' }
      ];

      this.shuffle();
      //console.log('This is openings data.......@@@@#######', this.openings);
    });

    this.carrerService.getTopCompanies(this.searchValue).subscribe( res => {
      this.topCompanies = res;
      //console.log('This is Top companies data.......', res);
      this.keeys = Object.keys(this.topCompanies);
      this.Values = Object.values(this.topCompanies);
  });

    this.carrerService.getTopSalaries(this.searchValue).subscribe( res => {
      this.topSalaries = res;
      this.salariesChart = Object.assign({}, res);
      this.lineChartLabels = [];
      this.lineChartData[0].data = [];
      this.topSalaries.forEach(element => {
        this.lineChartLabels.push(element.companyName);
        let item = element.salary.substring(1).replace(",", "");
        this.lineChartData[0].data.push(item);
      });
      //this.shuffle();
    });
  }

  shuffle() {
    var arr1 = this.lineChartLabels;
    var arr2 = this.lineChartData[0].data;
    var i,j,temp1,temp2;
    for (i = arr1.length - 1; i > 0; i--) {
        j = Math.floor(Math.random() * (i + 1));
        temp1 = arr1[i];
        arr1[i] = arr1[j];
        arr1[j] = temp1;
        temp2 = arr2[i];
        arr2[i] = arr2[j];
        arr2[j] = temp2;
    }
    this.lineChartLabels = arr1;
    this.lineChartData[0].data = arr2;  
    //console.log('Labels data...@@@@@....', this.lineChartLabels);
    this.openingsChart();
  }

  openSalaryLink(url) {
    window.open(url);
  }

  openRespectiveJobs(link) {
    //console.log('link to open@@@@@@', link);
    this.carrerService.updatecarrerJobLink(link);
    this.router.navigate(['dashboard/']);
  } 

}

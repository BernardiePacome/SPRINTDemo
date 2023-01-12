import {Component, OnInit} from '@angular/core';
import {ReportingService} from "../../services/reporting.service";
import {ReportInterface} from "../../models/report.interface";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private reportingService: ReportingService) {
  }

  report1 = {
    id: 1,
    author: {
      first_name: "John",
      last_name: "Doe",
      email: "j.doe@mobireport.com",
      birth_date: "1990-01-01",
      sex: "Homme"
    },
    observations: [
      {
        id: 1,
        name: "Observation 1"
      }
    ],
    description: "Un soucis sur mon réseau"
  }
  allReports: ReportInterface[] = [];

  ngOnInit(): void {

    // Mock service testing
    this.reportingService.getReports().subscribe((reports) => {
      console.log(reports);
      this.allReports = reports;
    });

    // This report already exists.
    this.addReport(this.report1);
  }
  addReport(report: ReportInterface) {
    this.reportingService.postReport(report).subscribe((response: any) => {
      console.log(response);
    });
  }
}
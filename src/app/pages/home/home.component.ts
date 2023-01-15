import {Component, OnInit} from '@angular/core';
import {ReportingService} from "../../services/reporting.service";
import {ReportInterface} from "../../models/report.interface";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  addingReport: boolean = false;
  constructor(private reportingService: ReportingService) {
  }
  allReports: ReportInterface[] = [];

  ngOnInit(): void {
    // Mock service testing
    this.refreshReports();
  }

  private refreshReports() {
    this.reportingService.getReports().subscribe((reports) => {
      this.allReports = reports;
    });
  }
  addReport(report: ReportInterface) {
    console.log(this.allReports);
    this.addingReport = false;
    this.refreshReports();
  }

  showNewReportForm() {
    this.addingReport = true;
  }

  cancelNewReport() {
    this.addingReport = false;
  }
}

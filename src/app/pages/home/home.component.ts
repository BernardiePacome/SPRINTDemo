import {Component, OnInit} from '@angular/core';
import {ReportingService} from "../../services/reporting.service";
import {ReportInterface} from "../../models/report.interface";
import {ViewportScroller} from "@angular/common";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(private reportingService: ReportingService) {

  }

  addingReport: boolean = false;
  allReports: ReportInterface[] = [];
  editingReport: ReportInterface | null = null;

  ngOnInit(): void {
    this.refreshReports();
  }

  private refreshReports() {
    this.reportingService.getReports().subscribe((reports) => {
      this.allReports = reports;
    });
  }

  addReport() {
    if (this.addingReport) {
      this.addingReport = false;
    }
    if (this.editingReport) {
      this.editingReport = null
    }
    this.refreshReports();
  }

  showNewReportForm() {
    this.addingReport = true;
  }

  cancelNewReport() {
    if (this.addingReport) {
      this.addingReport = false;
    } else if (this.editingReport) {
      this.editingReport = null;
    }
  }

  editReport($event: ReportInterface) {
    this.addingReport = false;
    this.editingReport = $event;
  }
}

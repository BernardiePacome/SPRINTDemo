import {Component, EventEmitter, Input, Output} from '@angular/core';
import {ReportInterface} from "../../models/report.interface";


@Component({
  selector: 'app-report-card',
  templateUrl: './report-card.component.html',
  styleUrls: ['./report-card.component.scss']
})
export class ReportCardComponent {
  @Input() report: ReportInterface | undefined;
  @Input() editReportMode: boolean = false
  @Output() editReportEvent = new EventEmitter<ReportInterface>();
  @Output() cancelEditReport = new EventEmitter<void>();

  editReport() {
    this.editReportEvent.emit(this.report);
  }
}

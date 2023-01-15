import {Component, EventEmitter, Input, Output} from '@angular/core';
import {ReportInterface} from "../../models/report.interface";


@Component({
  selector: 'app-report-card',
  templateUrl: './report-card.component.html',
  styleUrls: ['./report-card.component.scss']
})
export class ReportCardComponent {
  @Input() report: ReportInterface | undefined;

  @Output() editReportEvent = new EventEmitter<ReportInterface>();

  editReport() {
    this.editReportEvent.emit(this.report);
  }
}

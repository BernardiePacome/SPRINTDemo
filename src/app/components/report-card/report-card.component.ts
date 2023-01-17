import {Component, EventEmitter, Inject, Input, OnInit, Output} from '@angular/core';
import {ReportInterface} from "../../models/report.interface";
import {ReportingService} from "../../services/reporting.service";
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from "@angular/material/dialog";


@Component({
  selector: 'app-report-card',
  templateUrl: './report-card.component.html',
  styleUrls: ['./report-card.component.scss']
})
export class ReportCardComponent {
  constructor(public confirmationModal: MatDialog,
              private reportingService: ReportingService,
              ) {
  }

  @Input() report: ReportInterface | undefined;
  @Input() editReportMode: boolean = false
  @Output() editReportEvent = new EventEmitter<ReportInterface>();
  @Output() cancelEditReport = new EventEmitter<void>();


  editReport() {
    this.editReportEvent.emit(this.report);
  }

  openDeleteConfirmationModal() {
    const dialogRef = this.confirmationModal.open(ConformationModalComponent, {
      data: { reportToDelete: this.report }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.reportingService.deleteReport(result).subscribe();
      }
    });
  }
}

/**
 * Confirmation for Delete Report Modal.
 */
@Component({ selector: 'app-confirmation-modal', templateUrl: './confirmation-modal.component.html' })
export class ConformationModalComponent {
  constructor(public dialogRef: MatDialogRef<ConformationModalComponent>,
              @Inject(MAT_DIALOG_DATA) public data: ReportInterface | null
  ) {}

  onNoClick(): void {
    this.dialogRef.close(null);
  }

  onYesClick(): void {
    this.dialogRef.close(this.data)
  }
}

import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ConstsHelper} from "../../../helpers/constants.helper";
import * as moment from 'moment';
import {ReportInterface} from "../../../models/report.interface";
import {ReportingService} from "../../../services/reporting.service";

@Component({
  selector: 'app-report-form',
  templateUrl: './report-form.component.html',
  styleUrls: ['./report-form.component.scss']
})
export class ReportFormComponent implements OnInit {

  reportForm: FormGroup = new FormGroup({});

  constructor(private formBuilder: FormBuilder,
              private reportingService: ReportingService) {

  }

  submitLock: boolean = false;

  minDate = moment().subtract(100, 'years').toDate();
  maxDate = moment().toDate();
  errors = ConstsHelper.FORM_ERROR_MESSAGES as any;

  ngOnInit(): void {
    this.reportForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.pattern(ConstsHelper.FORM_REGEX.EMAIL)]],
      firstName: ['', [Validators.required, Validators.pattern(ConstsHelper.FORM_REGEX.FIRST_NAME)]],
      lastName: ['', [Validators.required, Validators.pattern(ConstsHelper.FORM_REGEX.LAST_NAME)]],
      birthDate: [null, [Validators.required]],
      genre: ['non-binary', [Validators.required]],
    });
  }

  getErrorForControl(controlName: string): string {
    const control = this.reportForm.controls[controlName];
    let errorMessage = '';
    if (control.invalid && control.touched) {
      console.log(control.errors);
      Object.keys(control.errors!)
        .map((key) => {
          errorMessage = this.errors[controlName][key];
        })
    }

    return errorMessage;
  }

  hasError(controlName: string) {
    return this.reportForm.controls[controlName].invalid && this.reportForm.controls[controlName].touched;
  }

  saveReport() {
    if (this.reportForm.valid && !this.submitLock) {
      this.reportingService.checkIfEmailIsAlreadyUsed(this.reportForm.value.email).subscribe(
        (isUsed) => {
          if (isUsed) {
            this.reportForm.controls['email'].setErrors({duplicate: true});
          } else {
            this.submitLock = true;
            const report = {
              email: this.reportForm.controls['email'].value,
              firstName: this.reportForm.controls['firstName'].value,
              lastName: this.reportForm.controls['lastName'].value,
              birthDate: this.reportForm.controls['birthDate'].value,
              genre: this.reportForm.controls['genre'].value,
            } as unknown as ReportInterface;
          };
        });
    }
  }
}


import {Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ConstsHelper} from "../../../helpers/constants.helper";
import * as moment from 'moment';
import {ReportInterface} from "../../../models/report.interface";
import {ReportingService} from "../../../services/reporting.service";
import {ObservationInterface} from "../../../models/observation.interface";
import {startWith, map, Observable} from "rxjs";
import {MatChipInputEvent} from "@angular/material/chips";
import {MatAutocompleteSelectedEvent} from "@angular/material/autocomplete";
import {COMMA, ENTER} from "@angular/cdk/keycodes";
import {AuthorInterface} from "../../../models/author.interface";

@Component({
  selector: 'app-report-form',
  templateUrl: './report-form.component.html',
  styleUrls: ['./report-form.component.scss']
})
export class ReportFormComponent implements OnInit {

  @Output() newReportEvent = new EventEmitter<ReportInterface>();

  @Input() nextReportId: number = 0;

  @ViewChild('observationsInput') observationsInput!: ElementRef<HTMLInputElement>;

  reportForm: FormGroup = new FormGroup({});
  allObservations: ObservationInterface[] = [];
  observations: ObservationInterface[] = [];
  filteredObservations!: Observable<ObservationInterface[]>;

  constructor(private formBuilder: FormBuilder,
              private reportingService: ReportingService) {}

  submitLock: boolean = false;

  minDate = moment().subtract(100, 'years').toDate();
  maxDate = moment().toDate();
  startDate = moment().subtract(18, 'years').toDate();
  errors = ConstsHelper.FORM_ERROR_MESSAGES as any;
  readonly separatorKeysCodes: number[] = [ENTER, COMMA];


  private _filter(value: string | null): ObservationInterface[] {
    if (value!) {
      const filterValue = value.toString().toLowerCase()
      return this.allObservations.filter(observation => observation.name.toLowerCase().includes(filterValue));
    } else {
      return this.allObservations;
    }
  }

  ngOnInit(): void {
    this.reportingService.getObservations().subscribe((observations) => {
      this.allObservations = observations;
    });

    this.reportForm = this.formBuilder.group({
      email: ['pab@ggeg.coco', [Validators.required, Validators.pattern(ConstsHelper.FORM_REGEX.EMAIL)]],
      firstName: ['Coco', [Validators.required, Validators.pattern(ConstsHelper.FORM_REGEX.FIRST_NAME)]],
      lastName: ['Face', [Validators.required, Validators.pattern(ConstsHelper.FORM_REGEX.LAST_NAME)]],
      birthDate: [null, [Validators.required]],
      genre: ['non-binary', [Validators.required]],
      description: [''],
      observationsControl: [''],
    });

    this.filteredObservations = this.reportForm.controls['observationsControl'].valueChanges.pipe(
      startWith(null),
      map((value: string | null) => this._filter(value))
    )
  }

  getErrorForControl(controlName: string): string {
    const control = this.reportForm.controls[controlName];
    let errorMessage = '';
    if (control.invalid && control.touched) {
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



  addObservation(event: MatChipInputEvent): void {
    const value = event.value;

    // Add our observation
    if ((value || '').trim()) {
      this.observations.push(
        this.allObservations.find((observation) => observation.name === value.trim())!
      );
    }

    // Clear the form control value
    this.reportForm.controls['observationsControl'].setValue(null);

  }

  removeObservation(observation: ObservationInterface): void {
    const index = this.observations.indexOf(observation);
    if (index >= 0) {
      this.observations.splice(index, 1);
    }
  }

  selectedObservation(event: MatAutocompleteSelectedEvent): void {
    this.observations.push(event.option.value);
    this.observationsInput.nativeElement.value = '';
    this.reportForm.controls['observationsControl'].setValue(null);
  }

  submitReport() {
    this.reportForm.markAllAsTouched()
    if (this.reportForm.valid && !this.submitLock) {
      this.reportingService.checkIfEmailIsAlreadyUsed(this.reportForm.value.email).subscribe(
        (isUsed) => {
          if (isUsed) {
            this.reportForm.controls['email'].setErrors({duplicate: true});
          } else {
            this.submitLock = true;
            const report = {
              author: {
                id: this.nextReportId,
                first_name: this.reportForm.controls['firstName'].value,
                last_name: this.reportForm.controls['lastName'].value,
                birth_date: this.reportForm.controls['birthDate'].value,
                email: this.reportForm.controls['email'].value,
                sex: this.reportForm.controls['genre'].value,
              } as AuthorInterface,
              description: this.reportForm.controls['description'].value,
              observations: this.observations,
            } as ReportInterface;

            this.reportingService.saveReport(report).subscribe((res) => {
              if (res) {
                console.log(report)
                this.newReportEvent?.emit(report);
              }
            });
          }
        });
    }
  }
}


import {Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ConstsHelper} from "../../../helpers/constants.helper";
import * as moment from 'moment';
import {ReportInterface} from "../../../models/report.interface";
import {ReportingService} from "../../../services/reporting.service";
import {ObservationInterface} from "../../../models/observation.interface";
import {startWith, map, Observable} from "rxjs";
import {COMMA, ENTER} from "@angular/cdk/keycodes";
import {AuthorInterface} from "../../../models/author.interface";

@Component({
  selector: 'app-report-form',
  templateUrl: './report-form.component.html',
  styleUrls: ['./report-form.component.scss']
})
export class ReportFormComponent implements OnInit {

  @Output() newReportEvent = new EventEmitter<void>();

  @Output() cancelNewReportEvent = new EventEmitter<void>();

  @Output() UpdateReportEvent = new EventEmitter<ReportInterface>();

  @Input() nextReportId: number = 0;

  @Input() editReport: ReportInterface | null = null;

  @ViewChild('observationsInput') observationsInput!: ElementRef<HTMLInputElement>;

  reportForm: FormGroup = new FormGroup({});
  allObservations: ObservationInterface[] = [];
  observations: ObservationInterface[] = [];
  filteredObservations!: Observable<ObservationInterface[]>;

  constructor(private formBuilder: FormBuilder,
              private reportingService: ReportingService) {
  }

  submitLock: boolean = false;

  minDate = moment().subtract(100, 'years').toDate();
  maxDate = moment().toDate();
  startDate = moment().subtract(18, 'years').toDate();
  errors = ConstsHelper.FORM_ERROR_MESSAGES as any;

  readonly separatorKeysCodes: number[] = [ENTER, COMMA];

  /**
   * Filter the observations list.
   */
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

    if (this.editReport) {
      // Making sure to create a new copy of the observations array to not modify the original object immediately during editing.
      this.observations = Object.create(this.editReport.observations);
      this.nextReportId = this.editReport.id;
      this.reportForm = this.formBuilder.group({
        email: [this.editReport.author.email, [Validators.required, Validators.pattern(ConstsHelper.FORM_REGEX.EMAIL)]],
        firstName: [this.editReport.author.first_name, [Validators.required, Validators.pattern(ConstsHelper.FORM_REGEX.FIRST_NAME)]],
        lastName: [this.editReport.author.last_name, [Validators.required, Validators.pattern(ConstsHelper.FORM_REGEX.LAST_NAME)]],
        birthDate: [this.editReport.author.birth_date, [Validators.required]],
        genre: [this.editReport.author.sex, [Validators.required]],
        description: [this.editReport.description],
        observationsControl: [this.editReport.observations],
      });
    } else {
      this.reportForm = this.formBuilder.group({
        email: ['', [Validators.required, Validators.pattern(ConstsHelper.FORM_REGEX.EMAIL)]],
        firstName: ['', [Validators.required, Validators.pattern(ConstsHelper.FORM_REGEX.FIRST_NAME)]],
        lastName: ['', [Validators.required, Validators.pattern(ConstsHelper.FORM_REGEX.LAST_NAME)]],
        birthDate: ['', [Validators.required]],
        genre: ['Non-binaire', [Validators.required]],
        description: [''],
        observationsControl: [''],
      });
    }

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


  addObservation(selectedObservation: ObservationInterface): void {
    const newObservation: ObservationInterface = this.allObservations.find((observation) => observation.name === selectedObservation.name)!;
    if (newObservation !== undefined && !this.includesObservation(newObservation)) {
      this.observations.push(newObservation);
    }

    this.reportForm.controls['observationsControl'].setValue(null);
  }

  includesObservation(observation: ObservationInterface): boolean {
    return this.observations.some((obs) => obs.id === observation.id);
  }

  removeObservation(observation: ObservationInterface): void {
    const index = this.observations.indexOf(observation);
    if (index >= 0) {
      this.observations.splice(index, 1);
    }
  }

  submitReport() {
    this.reportForm.markAllAsTouched();
    if (this.reportForm.valid && !this.submitLock) {
      this.reportingService.checkIfCanSave(this.reportForm.value.email, !!this.editReport).subscribe({
        next: () => {
            this.submitLock = true;
            const report = {
              id: this.nextReportId,
              author: {
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
                this.newReportEvent?.emit();
              }
            });
        },
        error: (err) => {
          console.error(err);
          this.reportForm.controls['email'].setErrors({duplicate: true});
        }
    });
    }
  }

  cancelNewReport() {
    this.cancelNewReportEvent.emit();
  }
}


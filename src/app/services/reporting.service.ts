import {Injectable} from '@angular/core';
import {Observable, of, throwError} from "rxjs";
import {ReportInterface} from "../models/report.interface";
import {ObservationInterface} from "../models/observation.interface";

@Injectable({
  providedIn: 'root'
})
export class ReportingService {

  private reports: ReportInterface[] = [
    {
      id: 0,
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
    },
    {
      id: 1,
      author: {
        first_name: "Jodie",
        last_name: "Parker",
        email: "j.parker@mobireport.com",
        birth_date: "1994-05-10",
        sex: "Femme"
      },
      observations: [
      ],
      description: "Un problème avec le débit de mon réseau"
    },
    {
      id: 1,
      author: {
        first_name: "Ben",
        last_name: "Rogers",
        email: "b.rogers@mobireport.com",
        birth_date: "1980-07-10",
        sex: "Non-binaire"
      },
      observations: [
      ],
      description: "Manque de personel"
    },
  ];

  constructor() {
  }

  public getObservations(): Observable<ObservationInterface[]> {
    return of([
      {
        id: 1,
        name: "Observation 1"
      },
      {
        id: 2,
        name: "Observation 2"
      },
      {
        id: 3,
        name: "Observation 3"
      },
      {
        id: 4,
        name: "Observation 4"
      }
    ]);
  }

  getReports(): Observable<ReportInterface[]> {
    return of(this.reports);
  }

  checkIfCanSave(email: string, editing: boolean): Observable<boolean> {
    let isUsed = this.reports.some((report) => report.author.email === email);
    if (isUsed && !editing) {
      return throwError(() => 'Email already used');
    }
    return of(isUsed);
  }

  saveReport(report: ReportInterface): Observable<boolean> {
    if (this.reports.some(r => r.id === report.id)) {
      this.reports.splice(this.reports.findIndex(r => r.id === report.id), 1);
    }
    this.reports.push(report as ReportInterface);
    return of(true);
  }

  deleteReport(report: ReportInterface): Observable<boolean> {
    this.reports.splice(this.reports.findIndex(r => r.id === report.id), 1);
    return of(true);
  }
}

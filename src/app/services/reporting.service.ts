import {Injectable} from '@angular/core';
import {Observable, of} from "rxjs";
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
    }
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

  public checkIfEmailIsAlreadyUsed(email: string): Observable<boolean> {
    return of(this.reports.some(report => report.author.email === email));
  }

  public getReports(): Observable<ReportInterface[]> {
    return of(this.reports);
  }

  saveReport(report: ReportInterface): Observable<boolean> {
    console.log(report, 'the report to modify');
    console.log(this.reports.findIndex(r => r.id === report.id));
    if (this.reports.some(r => r.id === report.id)) {
      this.reports.splice(this.reports.findIndex(r => r.id === report.id), 1);
    }
    this.reports.push(report as ReportInterface);
    console.log(this.reports)
    return of(true);
  }
}

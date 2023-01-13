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
      id: 1,
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

  public getReports(): Observable<ReportInterface[]> {
    return of(this.reports);
  }

   public postReport(report: ReportInterface): any {
    // for loop is faster than a ForEach loop to find if the report already exists from a user.
    for (let i = 0; i < this.reports.length; i++) {
      if (this.reports[i].author.email === report.author.email) {
        this.reports[i] = report;

        return of({
          author: {
            email: ['This value already exist']
          }
        });
      }
    }

    this.reports.push(report);
    return of({report});
  }
}

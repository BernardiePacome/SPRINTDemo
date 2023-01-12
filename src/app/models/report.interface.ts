import {ObservationInterface} from "./observation.interface";

export interface ReportInterface {
  id: number;
  author: {
    first_name: string;
    last_name: string;
    email: string;
    birth_date: string;
    sex: string;
  },
  observations: ObservationInterface[];
  description: string;
}

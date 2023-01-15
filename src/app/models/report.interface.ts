import {ObservationInterface} from "./observation.interface";
import {AuthorInterface} from "./author.interface";

export interface ReportInterface {
  id: number;
  author: AuthorInterface;
  observations: ObservationInterface[];
  description: string;
}

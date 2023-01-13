import {Component, Input, OnInit} from '@angular/core';
import {ObservationInterface} from "../../models/observation.interface";

@Component({
  selector: 'app-observations-panel',
  templateUrl: './observations-panel.component.html',
  styleUrls: ['./observations-panel.component.scss']
})
export class ObservationsPanelComponent {
  @Input() observations: ObservationInterface[] | undefined ;

  remove(observation: ObservationInterface) {
    // remove the observation from the list
    // this.observations = this.observations?.filter(o => o !== observation);

  }
}

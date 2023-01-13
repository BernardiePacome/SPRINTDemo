import {Component, Input} from '@angular/core';
import {AuthorInterface} from "../../models/author.interface";

@Component({
  selector: 'app-author-panel',
  templateUrl: './author-panel.component.html',
  styleUrls: ['./author-panel.component.scss']
})
export class AuthorPanelComponent {
  @Input() author: AuthorInterface | undefined;
  open: boolean = false;

  toggle() {
    this.open = !this.open;
  }

  getSummary() {
    return this.author?.first_name + " " + this.author?.last_name;
  }
}

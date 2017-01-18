import {Component} from "@angular/core";
import {Store} from "@ngrx/store";
import {AppStore} from "../../store";
import {MainService} from "../../services/main.service";


@Component({
  templateUrl: 'info.html'
})

export class InfoPage {
  infoUrl: string[];

  constructor(public store: Store<AppStore>, private main: MainService) {
    this.main.infoUrl.subscribe(data => this.infoUrl = data);
  }
}

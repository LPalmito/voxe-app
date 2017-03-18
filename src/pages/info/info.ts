import {Component} from "@angular/core";
import {Store} from "@ngrx/store";
import {AppStore} from "../../store";
import {MainService} from "../../services/main.service";
// import {HomePage} from "../home/home";
//
// export enum CardType {
//   Info,
//   Swipe
// }
//
// export class Card {
// 	image: string;
// 	isStar: boolean;
// 	isArchive: boolean;
// }
//
// export class InfoCard extends Card {
// 	infoUrl: string[];
// 	type: CardType = CardType.Info;
// }

@Component({
  templateUrl: 'info.html'
})

export class InfoPage {
  infoUrl: string[];

  constructor(public store: Store<AppStore>, private main: MainService) {
    this.main.infoUrl.subscribe(data => this.infoUrl = data);
  }
}

import {Component} from "@angular/core";
import {Store} from "@ngrx/store";
import {AppStore} from "../../store";
import {MainService} from "../../services/main.service";
import {STAR_CARD} from "../../reducers/cards.reducer";
import {Card, InfoCard, SwipeCard} from "../home/home";


@Component({
  templateUrl: 'info.html'
})

export class InfoPage {
  infoUrl: string[];
  activeCard: InfoCard|SwipeCard;

  constructor(public store: Store<AppStore>, private main: MainService) {
    this.main.infoUrl.subscribe(data => this.infoUrl = data);
    this.main.cards.subscribe(cards => {
      if(cards != undefined) {
        this.activeCard = this.main.getCurrentCard(cards);
      }
    });
}
  starCard(card: Card) {
    this.store.dispatch({type: STAR_CARD, payload: card});
  }
}

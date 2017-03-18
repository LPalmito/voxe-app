import {Component} from "@angular/core";
import {Store} from "@ngrx/store";
import {AppStore} from "../../store";
import {MainService} from "../../services/main.service";
import {STAR_CARD} from "../../reducers/cards.reducer";

export enum CardType {
  Info,
  Swipe
}

export class Card {
	image: string;
	isStar: boolean;
}

export class InfoCard extends Card {
	infoUrl: string[];
	type: CardType = CardType.Info;
}

export class SwipeCard extends Card {
  title: string;
  tagIds: string[];
  candidacyIds: string[];
  type: CardType = CardType.Swipe;
}

@Component({
  templateUrl: 'info.html'
})

export class InfoPage {
  infoUrl: string[];
  activeCard: Array<InfoCard|SwipeCard>;

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

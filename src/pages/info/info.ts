import {Component} from "@angular/core";
import {Store} from "@ngrx/store";
import {AppStore} from "../../store";
import {MainService} from "../../services/main.service";
import {DomSanitizer, SafeResourceUrl} from '@angular/platform-browser';
import {STAR_CARD} from "../../reducers/cards.reducer";
import {Card, InfoCard} from "../home/home";

@Component({
  templateUrl: 'info.html'
})

export class InfoPage {
  infoUrl: string[]|SafeResourceUrl;
  isHTML: boolean;
  activeCard: InfoCard;

  constructor(public store: Store<AppStore>, private main: MainService, public sanitizer: DomSanitizer) {
    this.main.isHTML.subscribe(data => {
      this.isHTML = data;
    });
    this.main.infoUrl.subscribe(data => {
      if (!this.isHTML) {
        this.infoUrl = data;
      }
      else if (this.isHTML) {
        this.infoUrl = this.sanitizer.bypassSecurityTrustResourceUrl(data[0]);
      }
    });
    this.main.cards.subscribe(cards => {
      if(cards != undefined) {
        this.activeCard = <InfoCard> this.main.getCurrentCard(cards);
      }
    });
  }

  starCard(card: Card) {
    this.store.dispatch({type: STAR_CARD, payload: card});
  }
}

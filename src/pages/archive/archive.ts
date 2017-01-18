import {Component} from "@angular/core";
import {Card, InfoCard, SwipeCard} from "../home/home";
import {Store} from "@ngrx/store";
import {AppStore} from "../../store";
import {MainService} from "../../services/main.service";

@Component({
  templateUrl: 'archive.html'
})

export class ArchivePage {

	// OLD home: HomePage = this.navParams.get('home');
	cardsRows: Array<InfoCard|SwipeCard>[];// = this.main.putCardsInRows(this.main.getArchives(this.store.cards));

  // TODO Computer l'icon en fonction du tagId
	icon: string = "../assets/img/icone-economie-24.png";

	constructor(private main: MainService, public store: Store<AppStore>) {
	  this.main.cards.subscribe(data => this.cardsRows = this.main.putCardsInRows(this.main.getArchives(data)));
	}

	restoreCard(card: Card) {
    this.store.dispatch({type: 'RESTORE_CARD', payload: card});
	}
}

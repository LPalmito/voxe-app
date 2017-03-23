import {Component} from "@angular/core";
import {Card, InfoCard, SwipeCard} from "../home/home";
import {Store} from "@ngrx/store";
import {AppStore} from "../../store";
import {MainService} from "../../services/main.service";
import {RESTORE_CARD} from "../../reducers/cards.reducer";

@Component({
  templateUrl: 'archive.html'
})

export class ArchivePage {

	archiveCardsRows: Array<InfoCard|SwipeCard>[];

	constructor(private main: MainService, public store: Store<AppStore>) {
	  this.main.cards.subscribe(data => this.archiveCardsRows = this.main.putCardsInRows(this.main.getArchives(data)));
	}

	restoreCard(card: Card) {
    this.store.dispatch({type: RESTORE_CARD, payload: card});
	}
}

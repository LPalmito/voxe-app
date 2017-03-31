import {Component} from "@angular/core";
import {HomePage, Card, InfoCard, SwipeCard, CardType} from "../home/home";
import {Store} from "@ngrx/store";
import {AppStore} from "../../store";
import {MainService} from "../../services/main.service";
import {RESTORE_CARD} from "../../reducers/cards.reducer";
import {NavController} from "ionic-angular";

@Component({
  templateUrl: 'archive.html'
})

export class ArchivePage {

	archiveCardsRows: Array<InfoCard|SwipeCard>[];

	constructor(private main: MainService, public store: Store<AppStore>, public nav: NavController) {
	  this.main.cards.subscribe(cards => this.archiveCardsRows = this.main.putCardsInRows(this.main.getArchives(cards)));
	}

	restoreCard(card: Card) {
	  this.store.dispatch({type: RESTORE_CARD, payload: card});
	}

	isSwipeCard(card: InfoCard|SwipeCard) {
		return card.type == CardType.Swipe;
	}

	goToHomePage() {
		this.nav.setRoot(HomePage);
	}

}

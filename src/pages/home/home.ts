import {Component} from "@angular/core";
import {InfoPage} from "../info/info";
import {SwipePage} from "../swipe/swipe";
import {ArchivePage} from "../archive/archive";
import {MainService} from "../../services/main.service";
import {AppStore} from "../../store";
import {Store} from "@ngrx/store";
import {SET_INFO_URL} from "../../reducers/info-url.reducer";
import {SET_TAG_IDS} from "../../reducers/tag-ids.reducer";
import {SET_CANDIDACY_IDS} from "../../reducers/candidacy-ids.reducer";
import {ACTIVE_CARD, STAR_CARD, ARCHIVE_CARD, SET_CARDS} from "../../reducers/cards.reducer";
import {SET_ELECTION} from "../../reducers/election.reducer";
import {SET_PROPOSITIONS} from "../../reducers/propositions.reducer";
import {NavController} from "ionic-angular";
import {PropositionService} from "../../services/propositions.service";
import {SET_INFO_TYPE} from "../../reducers/info-type.reducer";
import {InfoCards} from "../../services/info-cards.service";

export enum CardType {
  Info,
  Swipe
}

export class Card {
	image: string;
	isStar: boolean;
	isArchive: boolean;
  isActive: boolean;
}

export class InfoCard extends Card {
	infoUrl: string[];
	isHTML: boolean;
	type: CardType = CardType.Info;
}

export class SwipeCard extends Card {
	title: string;
  tagIds: string[];
  candidacyIds: string[];
	type: CardType = CardType.Swipe;
}


@Component({
  templateUrl: 'home.html',
  providers: [InfoCards]
})

export class HomePage {

	cardsRows: Array<InfoCard|SwipeCard>[];
	starCardsRows: Array<InfoCard|SwipeCard>[];
  selectedSegment: string;

	constructor(private main: MainService, private info: InfoCards, public store: Store<AppStore>,
              public nav: NavController, private propositionService: PropositionService) {

	  // Initialize the selected segment
	  this.selectedSegment = 'all';

    // Initialize the cards
    this.main.cards.subscribe(cards => {
      if(cards != undefined) {
        this.starCardsRows = this.main.putCardsInRows(this.main.getStars(this.main.getNoArchive(cards)));
        this.cardsRows = this.main.putCardsInRows(this.main.getNoArchive(cards));
      }
    });

    // Initialize the election
    this.main.getElectionViaVoxe().subscribe(election => {
      this.store.dispatch({type: SET_ELECTION, payload: election});
    });

    // Initialize the propositions
    this.propositionService.getPropositionsForElection().subscribe(propositions => {
      this.store.dispatch({type: SET_PROPOSITIONS, payload: propositions});
    });

    this.store.dispatch({type: SET_CARDS, payload: this.info.allCards});

  }

// Navigation methods

	openCard(card: InfoCard|SwipeCard) {
    if (card.type == CardType.Info) {
      let infoCard = <InfoCard> card;
      this.store.dispatch({type: SET_INFO_URL, payload: infoCard.infoUrl});
      this.store.dispatch({type: SET_INFO_TYPE, payload: infoCard.isHTML});
      this.store.dispatch({type: ACTIVE_CARD, payload: card});
      this.nav.push(InfoPage);
      // this.store.dispatch({type: GO_TO, payload: InfoPage});
    }
    else if (card.type == CardType.Swipe) {
      let swipeCard = <SwipeCard> card;
      this.store.dispatch({type: ACTIVE_CARD, payload: card});
      this.store.dispatch({type: SET_TAG_IDS, payload: swipeCard.tagIds});
      this.store.dispatch({type: SET_CANDIDACY_IDS, payload: swipeCard.candidacyIds});
      this.nav.push(SwipePage);
      // this.store.dispatch({type: GO_TO, payload: SwipePage});
    }
  }

	goToArchivePage() {
    this.nav.push(ArchivePage);
    // this.store.dispatch({type: GO_TO, payload: ArchivePage});
	}

	starCard(card: Card) {
    this.store.dispatch({type: STAR_CARD, payload: card});
	}

	archiveCard(card: Card) {
    this.store.dispatch({type: ARCHIVE_CARD, payload: card});
	}

	// Helper to know if a card is a SwipeCard or not
	isSwipeCard(card: SwipeCard|InfoCard) {
    return card.type == CardType.Swipe;
  }

}

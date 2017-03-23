import {Component} from "@angular/core";
import {InfoPage} from "../info/info";
import {SwipePage} from "../swipe/swipe";
import {ArchivePage} from "../archive/archive";
import {MainService} from "../../services/main.service";
import {AppStore} from "../../store";
import {Store} from "@ngrx/store";
import {Storage} from '@ionic/storage';
import {SET_INFO_URL} from "../../reducers/info-url.reducer";
import {SET_TAG_IDS} from "../../reducers/tag-ids.reducer";
import {SET_CANDIDACY_IDS} from "../../reducers/candidacy-ids.reducer";
import {ACTIVE_CARD, STAR_CARD, ARCHIVE_CARD, SET_CARDS, ADD_CARD} from "../../reducers/cards.reducer";
import {SET_ELECTION} from "../../reducers/election.reducer";
import {SET_PROPOSITIONS} from "../../reducers/propositions.reducer";
import {NavController} from "ionic-angular";
import {PropositionService} from "../../services/propositions.service";
import {SET_INFO_TYPE} from "../../reducers/info-type.reducer";
import {InfoCardsService} from "../../services/info-cards.service";

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
})

export class HomePage {

	cardsRows: Array<InfoCard|SwipeCard>[];
	starCardsRows: Array<InfoCard|SwipeCard>[];
	swipeCardsRows: Array<InfoCard|SwipeCard>[];
	infoCardsRows: Array<InfoCard|SwipeCard>[];
  selectedSegment: string;

	constructor(private main: MainService, public store: Store<AppStore>, public nav: NavController,
              private propositionService: PropositionService, private infoCardsService: InfoCardsService
              // When the time will come to use storage it is just here (but it's causing errors in browser):
              // private storage: Storage
  ) {

	  // Initialize the selected segment
	  this.selectedSegment = 'all';

    // Initialize the cards
    this.main.cards.subscribe(cards => {
      if(cards != undefined) {
        this.starCardsRows = this.main.putCardsInRows(this.main.getStars(this.main.getNoArchive(cards)));
        this.cardsRows = this.main.putCardsInRows(this.main.getNoArchive(cards));
        this.swipeCardsRows = this.main.putCardsInRows(this.main.getSwipeCards(this.main.getNoArchive(cards)));
        this.infoCardsRows = this.main.putCardsInRows(this.main.getInfoCards(this.main.getNoArchive(cards)));
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

    this.store.dispatch({type: SET_CARDS, payload: this.infoCardsService.allCards});

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

  getRandomIds(ids: string[], nb: number) {
    let array: string[] = [];
    for (let i=0 ; i<nb ; i++) {
      let randomNumber = Math.floor(Math.random()*ids.length);
      while (array.indexOf(ids[randomNumber]) > -1) {
        randomNumber = Math.floor(Math.random()*ids.length);
      }
      array = array.concat([ids[randomNumber]]);
    }
    return array;
  }

  getNextBackground() {
	  let previousBackground = this.swipeCardsRows[0][0].image;
    let previousNumber = parseInt(previousBackground.slice(-5, -4));
    let nextNumber = ((previousNumber + 1) % 5) +1;
	  return "assets/img/home-swipe-"+nextNumber.toString()+".png";
  }

  generateQuizz() {
    let newCard: SwipeCard = {
      title: "???",
      image: this.getNextBackground(),
      tagIds: this.getRandomIds(this.main.temp_tagIds,1),
      isStar: false,
      isArchive: false,
      isActive: false,
      type: CardType.Swipe,
      candidacyIds: this.getRandomIds(this.main.temp_candidacyIds,2)
    };
    this.store.dispatch({type: ADD_CARD, payload: newCard});
    this.selectedSegment = 'swipe';
  }
}

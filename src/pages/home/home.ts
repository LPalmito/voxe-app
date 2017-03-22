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
import {ACTIVE_CARD, STAR_CARD, ARCHIVE_CARD, SET_CARDS, ADD_CARD} from "../../reducers/cards.reducer";
import {SET_ELECTION} from "../../reducers/election.reducer";
import {SET_PROPOSITIONS} from "../../reducers/propositions.reducer";
import {NavController} from "ionic-angular";
import {PropositionService} from "../../services/propositions.service";

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
	type: CardType = CardType.Info;
}

export class SwipeCard extends Card {
	title: string;
  tagIds: string[];
  candidacyIds: string[];
	type: CardType = CardType.Swipe;
}


@Component({
  templateUrl: 'home.html'
})

export class HomePage {

	cardsRows: Array<InfoCard|SwipeCard>[];
	starCardsRows: Array<InfoCard|SwipeCard>[];
  selectedSegment: string;

	constructor(private main: MainService, public store: Store<AppStore>, public nav: NavController,
              private propositionService: PropositionService) {

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

    // TODO: Delete it, only for test purposes
    let cards: Array<InfoCard|SwipeCard> = [
      {
        title: "François Fillon + Alain Juppé + Numérique = ?",
        image: "assets/img/home-swipe-1.png",
        tagIds: [this.main.numeriqueId],
        isStar: false,
        isArchive: false,
        isActive: false,
        type: CardType.Swipe,
        candidacyIds: [this.main.alainJuppeId, this.main.francoisFillonId]
      },
      {
        image: "assets/img/home-role-president.png",
        isStar: false,
        isArchive: false,
        isActive: false,
        type: CardType.Info,
        infoUrl: ["assets/img/info-role-president.png"]
      },
      {
        image: "assets/img/home-carte-scolaire.png",
        isStar: false,
        isArchive: false,
        isActive: false,
        type: CardType.Info,
        infoUrl: ["assets/img/info-carte-scolaire.png"]
      },
      {
        title: "Nicolas Sarkozy + Alain Juppé + Justice = ?",
        image: "assets/img/home-swipe-3.png",
        tagIds: [this.main.justiceId],
        isStar: false,
        isArchive: false,
        isActive: false,
        type: CardType.Swipe,
        candidacyIds: [this.main.nicolasSarkozyId, this.main.alainJuppeId]
      },
      {
        image: "assets/img/home-primaire-droite.png",
        isStar: false,
        isArchive: false,
        isActive: false,
        type: CardType.Info,
        infoUrl: ["assets/img/info-primaire-droite.png","assets/img/info-primaire-droite-2.png"]
      },
      {
        title: "NKM + Jean-François Copé + Education = ?",
        image: "assets/img/home-swipe-2.png",
        tagIds: [this.main.educationId],
        isStar: false,
        isArchive: false,
        isActive: false,
        type: CardType.Swipe,
        candidacyIds: [this.main.nathalieKMId, this.main.jeanFrancoisCopeId]
      },
      {
        image: "assets/img/home-dette-publique.png",
        isStar: false,
        isArchive: false,
        isActive: false,
        type: CardType.Info,
        infoUrl: ["assets/img/info-dette-publique.png","assets/img/info-dette-publique-2.png"]
      },
      {
        image: "assets/img/home-crise-migratoire.png",
        isStar: false,
        isArchive: false,
        isActive: false,
        type: CardType.Info,
        infoUrl: ["assets/img/info-crise-migratoire.png","assets/img/info-crise-migratoire-2.png"]
      },
      {
        image: "assets/img/home-etat-d-urgence.png",
        isStar: false,
        isArchive: false,
        isActive: false,
        type: CardType.Info,
        infoUrl: ["assets/img/info-etat-d-urgence.png"]
      },
      {
        image: "assets/img/home-prison.png",
        isStar: false,
        isArchive: false,
        isActive: false,
        type: CardType.Info,
        infoUrl: ["assets/img/info-prison.png"]
      },
      {
        image: "assets/img/home-religion-ecole.png",
        isStar: false,
        isArchive: false,
        isActive: false,
        type: CardType.Info,
        infoUrl: ["assets/img/info-religion-ecole.png","assets/img/info-religion-ecole-2.png","assets/img/info-religion-ecole-3.png"]
      },
      {
        title: "Nicolas Sarkozy + François Fillon + Europe = ?",
        image: "assets/img/home-swipe-4.png",
        tagIds: [this.main.europeId],
        isStar: false,
        isArchive: false,
        isActive: false,
        type: CardType.Swipe,
        candidacyIds: [this.main.nicolasSarkozyId, this.main.francoisFillonId]
      },
      {
        image: "assets/img/home-cumul-mandats.png",
        isStar: false,
        isArchive: false,
        isActive: false,
        type: CardType.Info,
        infoUrl: ["assets/img/info-cumul-mandats.png","assets/img/info-cumul-mandats-2.png"]
      },
      {
        image: "assets/img/home-prelevement-source.png",
        isStar: false,
        isArchive: false,
        isActive: false,
        type: CardType.Info,
        infoUrl: ["assets/img/info-prelevement-source.png","assets/img/info-prelevement-source-2.png"]
      },
      {
        image: "assets/img/home-fiscalite.png",
        isStar: false,
        isArchive: false,
        isActive: false,
        type: CardType.Info,
        infoUrl: ["assets/img/info-fiscalite.png","assets/img/info-fiscalite-2.png"]
      },
      {
        image: "assets/img/home-fiche-s.png",
        isStar: false,
        isArchive: false,
        isActive: false,
        type: CardType.Info,
        infoUrl: ["assets/img/info-fiche-s.png","assets/img/info-fiche-s-2.png"]
      },
      {
        image: "assets/img/home-primaire-ecologiste.png",
        isStar: false,
        isArchive: false,
        isActive: false,
        type: CardType.Info,
        infoUrl: ["assets/img/info-primaire-ecologiste.png"]
      },
      {
        image: "assets/img/home-cigeo.png",
        isStar: false,
        isArchive: false,
        isActive: false,
        type: CardType.Info,
        infoUrl: ["assets/img/info-cigeo.png","assets/img/info-cigeo-2.png"]
      }
    ];

    this.store.dispatch({type: SET_CARDS, payload: cards});

  }

// Navigation methods

	openCard(card: InfoCard|SwipeCard) {
    if (card.type == CardType.Info) {
      let infoCard = <InfoCard> card;
      this.store.dispatch({type: ACTIVE_CARD, payload: card});
      this.store.dispatch({type: SET_INFO_URL, payload: infoCard.infoUrl})
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
	  let previousBackground = this.cardsRows[0][0].image;
	  let previousNumber = parseInt(previousBackground.slice(-5,-4));
	  console.log(previousNumber);
	  let nextNumber = previousNumber==5 ? 1 : previousNumber+1;
	  console.log(nextNumber);
	  return "assets/img/home-swipe-"+nextNumber.toString()+".png";
  }

  generateQuizz() {
    let newCard: SwipeCard = {
      title: "????????",
      image: this.getNextBackground(),
      tagIds: this.getRandomIds(this.main.temp_tagIds,1),
      isStar: false,
      isArchive: false,
      isActive: false,
      type: CardType.Swipe,
      candidacyIds: this.getRandomIds(this.main.temp_candidacyIds,2)
    };
    this.store.dispatch({type: ADD_CARD, payload: newCard});
  }
}

import {Component} from "@angular/core";
import {InfoPage} from "../info/info";
import {SwipePage} from "../swipe/swipe";
import {ArchivePage} from "../archive/archive";
import {MainService} from "../../services/main.service";
import {CandidateService} from "../../services/candidates.service";
import {PropositionService} from "../../services/propositions.service";
import {Store} from "@ngrx/store";
import {AppStore} from "../../store";

export enum CardType {
  Info,
  Swipe
}

export class Card {
	title: string;
	image: string;
	tagIds: string[];
	isStar: boolean;
	isArchive: boolean;
}

export class InfoCard extends Card {
	infoUrl: string;
	type: CardType = CardType.Info;
}

export class SwipeCard extends Card {
	candidacyIds: string[];
	type: CardType = CardType.Swipe;
}


@Component({
  templateUrl: 'home.html'
})

export class HomePage {

	//TODO computer l'icon en fonction du tagId
  icon: string = "../assets/img/icone-economie-24.png";

	cardsRows: Array<InfoCard|SwipeCard>[]; //= this.main.putCardsInRows(this.main.getNoArchive(this.store.cards));
	starCardsRows: Array<InfoCard|SwipeCard>[]; //= this.main.putCardsInRows(this.main.getStars(this.main.getNoArchive(this.store.cards)));

	constructor(private main: MainService, private candidateService: CandidateService, private propositionService: PropositionService,
              public store: Store<AppStore>) {
    this.main.initParams();
    this.main.cards.subscribe(function(data) {
      this.cardsRows = this.main.putCardsInRows(this.main.getNoArchive(data));
      this.starCardsRows = this.main.putCardsInRows(this.main.getStars(this.main.getNoArchive(data)));
    });

    // HARD CODAGE A ENLEVER PLUS TARD
    let cards: Array<InfoCard|SwipeCard> = [
      {
        title: "La fiscalite",
        image: "../assets/img/home-fiscalite.jpg",
        tagIds: [this.main.economieId],
        isStar: false,
        isArchive: false,
        type: CardType.Info,
        infoUrl: "../assets/img/info-fiscalite.png"
      },
      {
        title: "Le centre Cigéo",
        image: "../assets/img/home-cigeo.jpg",
        tagIds: [this.main.justiceId],
        isStar: false,
        isArchive: false,
        type: CardType.Info,
        infoUrl: "../assets/img/info-cigeo.png"
      },
      {
        title: "La primaire de la droite et du centre",
        image: "../assets/img/home-primaire.jpg",
        tagIds: [this.main.cultureId],
        isStar: false,
        isArchive: false,
        type: CardType.Info,
        infoUrl: "../assets/img/info-primaire-droite.png"
      },
      {
        title: "François Fillon | Alain Juppé",
        image: "../assets/img/home-primaire.jpg",
        tagIds: [this.main.numeriqueId],
        isStar: false,
        isArchive: false,
        type: CardType.Swipe,
        candidacyIds: [this.main.francoisFillonId, this.main.alainJuppeId]
      }
    ];
    this.store.dispatch({type: 'SET_CARDS', payload: cards});
  }

	openCard(card: InfoCard|SwipeCard) {
    // // FOR TESTS ONLY
    // this.candidateService.getCandidates()
    //   .subscribe(x => console.log("candidates: ", x));
    // this.propositionService.getPropositions()
    //   .subscribe(x => console.log("propositions: ", x));

    if (card.type == CardType.Info) {
      let infoCard = <InfoCard> card;
      //OLD this.nav.push(InfoPage, {infoUrl: infoCard.infoUrl});
      this.store.dispatch({type: 'SET_INFO_URL', payload: infoCard.infoUrl});
      this.store.dispatch({type: 'GO_TO', payload: InfoPage});
    }
    else if (card.type == CardType.Swipe) {
      let swipeCard = <SwipeCard> card;
      //OLD this.nav.push(SwipePage, {tagIds: swipeCard.tagIds, candidacyIds: swipeCard.candidacyIds});
      this.store.dispatch({type: 'SET_TAG_IDS', payload: swipeCard.tagIds});
      this.store.dispatch({type: 'SET_CANDIDACY_IDS', payload: swipeCard.candidacyIds});
      this.store.dispatch({type: 'GO_TO', payload: SwipePage});
    }
  }

	goToArchivePage() {
    //OLD this.nav.push(ArchivePage, {home: this});
    this.store.dispatch({type: 'GO_TO', payload: ArchivePage});
	}

	starCard(card: Card) {
	  // OLD
		//if (card.isStar == true) {
		//	card.isStar = false;
		//	this.starCardsRows = this.putCardsInRows(this.getStars(this.cards));
		//}
		//else if (card.isStar == false) {
		//	card.isStar = true;
		//	this.starCardsRows = this.putCardsInRows(this.getStars(this.cards));
		//}
    this.store.dispatch({type: 'STAR_CARD', payload: card});
	}

	archiveCard(card: Card) {
		//OLD card.isArchive = true;
    this.store.dispatch({type: 'ARCHIVE_CARD', payload: card});
	}
}

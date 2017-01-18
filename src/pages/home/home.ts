import {Component} from "@angular/core";
import {InfoPage} from "../info/info";
import {SwipePage} from "../swipe/swipe";
import {ArchivePage} from "../archive/archive";
import {MainService} from "../../services/main.service";
import {CandidateService} from "../../services/candidates.service";
import {PropositionService} from "../../services/propositions.service";
import {AppStore} from "../../store";
import {Store} from "@ngrx/store";

export enum CardType {
  Info,
  Swipe
}

export class Card {
	//title: string;
	image: string;
	tagIds: string[];
	isStar: boolean;
	isArchive: boolean;
}

export class InfoCard extends Card {
	infoUrl: string[];
	type: CardType = CardType.Info;
}

export class SwipeCard extends Card {
	title: string;
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
        image: "../assets/img/home-role-president.png",
        tagIds: [this.main.economieId],
        isStar: false,
        isArchive: false,
        type: CardType.Info,
        infoUrl: ["../assets/img/info-role-president.png"]
      },
       {
        image: "../assets/img/home-carte-scolaire.png",
        tagIds: [this.main.economieId],
        isStar: false,
        isArchive: false,
        type: CardType.Info,
        infoUrl: ["../assets/img/info-carte-scolaire.png"]
      },
       {
        image: "../assets/img/home-primaire-droite.png",
        tagIds: [this.main.economieId],
        isStar: false,
        isArchive: false,
        type: CardType.Info,
        infoUrl: ["../assets/img/info-primaire-droite.png","../assets/img/info-primaire-droite-2.png"]
      },
       {
        image: "../assets/img/home-dette-publique.png",
        tagIds: [this.main.economieId],
        isStar: false,
        isArchive: false,
        type: CardType.Info,
        infoUrl: ["../assets/img/info-dette-publique.png","../assets/img/info-dette-publique-2.png"]
      },
       {
        image: "../assets/img/home-crise-migratoire.png",
        tagIds: [this.main.economieId],
        isStar: false,
        isArchive: false,
        type: CardType.Info,
        infoUrl: ["../assets/img/info-crise-migratoire.png","../assets/img/info-crise-migratoire-2.png"]
      },
       {
        image: "../assets/img/home-etat-d-urgence.png",
        tagIds: [this.main.economieId],
        isStar: false,
        isArchive: false,
        type: CardType.Info,
        infoUrl: ["../assets/img/info-etat-d-urgence.png"]
      },
       {
        image: "../assets/img/home-prison.png",
        tagIds: [this.main.economieId],
        isStar: false,
        isArchive: false,
        type: CardType.Info,
        infoUrl: ["../assets/img/info-prison.png"]
      },
       {
        image: "../assets/img/home-religion-ecole.png",
        tagIds: [this.main.economieId],
        isStar: false,
        isArchive: false,
        type: CardType.Info,
        infoUrl: ["../assets/img/info-religion-ecole.png","../assets/img/info-religion-ecole-2.png","../assets/img/info-religion-ecole-3.png"]
      },
       {
        image: "../assets/img/home-cumul-mandats.png",
        tagIds: [this.main.economieId],
        isStar: false,
        isArchive: false,
        type: CardType.Info,
        infoUrl: ["../assets/img/info-cumul-mandats.png","../assets/img/info-cumul-mandats-2.png"]
      },
       {
        image: "../assets/img/home-prelevement-source.png",
        tagIds: [this.main.economieId],
        isStar: false,
        isArchive: false,
        type: CardType.Info,
        infoUrl: ["../assets/img/info-prelevement-source.png","../assets/img/info-prelevement-source-2.png"]
      },
       {
        image: "../assets/img/home-fiscalite.png",
        tagIds: [this.main.economieId],
        isStar: false,
        isArchive: false,
        type: CardType.Info,
        infoUrl: ["../assets/img/info-fiscalite.png","../assets/img/info-fiscalite-2.png"]
      },
       {
        image: "../assets/img/home-fiche-s.png",
        tagIds: [this.main.economieId],
        isStar: false,
        isArchive: false,
        type: CardType.Info,
        infoUrl: ["../assets/img/info-fiche-s.png","../assets/img/info-fiche-s-2.png"]
      },
       {
        image: "../assets/img/home-primaire-ecologiste.png",
        tagIds: [this.main.economieId],
        isStar: false,
        isArchive: false,
        type: CardType.Info,
        infoUrl: ["../assets/img/info-primaire-ecologiste.png"]
      },
       {
        image: "../assets/img/home-cigeo.png",
        tagIds: [this.main.economieId],
        isStar: false,
        isArchive: false,
        type: CardType.Info,
        infoUrl: ["../assets/img/info-cigeo.png","../assets/img/info-cigeo-2.png"]
      },
      {
        title: "",
        image: "../assets/img/home-juppe-fillon.png",
        tagIds: [this.main.numeriqueId],
        isStar: false,
        isArchive: false,
        type: CardType.Swipe,
        candidacyIds: [this.main.francoisFillonId, this.main.alainJuppeId]
      }
    ];
    this.store.dispatch({type: 'SET_CARDS', payload: cards});
  }

// Navigation methods
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

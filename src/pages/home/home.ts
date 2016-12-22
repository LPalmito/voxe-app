import {Component} from "@angular/core";
import {NavController, NavParams} from "ionic-angular";
import {InfoPage} from "../info/info";
import {SwipePage} from "../swipe/swipe";
import {ArchivePage} from "../archive/archive";

export enum CardType {
	Info,
	Swipe
}

export enum CardStatus {
	Star,
	NoStar
}

export enum CardIsArchive {
	Yes,
	No
}

export class Card {
	type: CardType;
	title: string;
	image: string;
	icon: string;
	tagId: string;
	status: CardStatus;
	isArchive: CardIsArchive;
	infoPage: string;
	candidate1Id: string;
	candidate2Id: string;
}


@Component({
  templateUrl: 'home.html'
})

export class HomePage {
	public cardType = CardType;
	public cardStatus = CardStatus;
	public cardIsArchive = CardIsArchive;

	francoisFillonId = "578f480ab0bba9398100000b";
	alainJuppeId = "57962957793b3f868d000012";
	emploiId = "4ef479f9bc60fb000400009a";
	economieId = "4ef479f9bc60fb00040000aa";
	financeId = "4ef479f9bc60fb00040000be";
	europeId = "4ef479fcbc60fb0004000204";
	educationId = "4ef479f9bc60fb0004000052";
	cultureId = "578504e585b1a8f7f6000094";
	numeriqueId = "4ef479f8bc60fb000400002c";
	justiceId = "4ef479f9bc60fb00040000cc";


	cards: Card[] = [
		{
			type: CardType.Info,
			title: "La fiscalite",
			image: "../assets/img/home-fiscalite.jpg",
			icon: "../assets/img/icone-economie-24.png",
			tagId: "",
			status: CardStatus.NoStar,
			isArchive: CardIsArchive.No,
			infoPage: "../assets/img/info-fiscalite.png",
			candidate1Id: "",
			candidate2Id: ""

		},
		{
			type: CardType.Info,
			title: "Le centre Cigéo",
			image: "../assets/img/home-cigeo.jpg",
			icon: "../assets/img/icone-environnement-24.png",
			tagId: "",
			status: CardStatus.NoStar,
			isArchive: CardIsArchive.No,
			infoPage: "../assets/img/info-cigeo.png",
			candidate1Id: "",
			candidate2Id: ""

		},
		{
			type: CardType.Info,
			title: "La primaire de la droite et du centre",
			image: "../assets/img/home-primaire.jpg",
			icon: "../assets/img/icone-institutions-24.png",
			tagId: "",
			status: CardStatus.NoStar,
			isArchive: CardIsArchive.No,
			infoPage: "../assets/img/info-primaire-droite.png",
			candidate1Id: "",
			candidate2Id: ""

		},
		{
			type: CardType.Swipe,
			title: "François Fillon / Alain Juppé",
			image: "../assets/img/home-primaire.jpg",
			icon: "../assets/img/icone-technologie-24.png",
			tagId: this.numeriqueId,
			status: CardStatus.NoStar,
			isArchive: CardIsArchive.No,
			infoPage: "",
			candidate1Id: this.francoisFillonId,
			candidate2Id: this.alainJuppeId
		}

	];
	
	cardsRows: Card[][] = this.putCardsInRows(this.getNoArchive(this.cards));
	starCardsRows: Card[][] = this.putCardsInRows(this.getStars(this.getNoArchive(this.cards)));

	constructor(public nav: NavController) {
	}

// Navigation methods
	openCard(card: Card) {
		if (card.type == CardType.Info) {
			this.nav.push(InfoPage, {infoPage:card.infoPage});
		}

		else if (card.type == CardType.Swipe) {
			this.nav.push(SwipePage, {tagId: card.tagId, candidate1Id: card.candidate1Id, candidate2Id: card.candidate2Id});
		}
	}

	goToArchivePage() {
		this.nav.push(ArchivePage, {home: this});
	}

// Action methods
	// Takes an array of cards and returns an array of rows (a row is an array of 2 cards)
	putCardsInRows(cards: Card[]) {
		var rows: Card[][] = [];
		for (var i=0 ; i<cards.length-1 ; i=i+2) {
			rows.push([cards[i],cards[i+1]]);
		}
		
		if (cards.length==1) {
			rows.push([cards[0]]);
		}
		else if (cards.length%2!=0) {
			rows.push([cards[cards.length-1]]);
		}
		return rows;
	}

	starCard(card: Card) {
		if (card.status == CardStatus.Star) {
			card.status = CardStatus.NoStar;
			this.starCardsRows = this.putCardsInRows(this.getStars(this.cards));
		}
		else if (card.status == CardStatus.NoStar) {
			card.status = CardStatus.Star;
			this.starCardsRows = this.putCardsInRows(this.getStars(this.cards));
		}
	}

	archiveCard(card: Card) {
		card.isArchive = CardIsArchive.Yes;
		this.cardsRows = this.putCardsInRows(this.getNoArchive(this.cards));
		this.starCardsRows = this.putCardsInRows(this.getNoArchive(this.getStars(this.cards)));
	}

// Getters
	getStars(cards: Card[]) {
		var starCards: Card[] = [];
		for (var i=0 ; i<cards.length ; i++) {
			if (cards[i].status == CardStatus.Star) {
				starCards.push(cards[i]);
			}
		}
		return starCards;
	}

	getNoArchive(cards: Card[]) {
		var visibleCards: Card[] = [];
		for (var i=0 ; i<cards.length ; i++) {
			if (cards[i].isArchive == CardIsArchive.No) {
				visibleCards.push(cards[i]);
			}
		}
		return visibleCards;
	}

	getArchives(cards: Card[]) {
		var archiveCards: Card[] = [];
		for (var i=0 ; i<cards.length ; i++) {
			if (cards[i].isArchive == CardIsArchive.Yes) {
				archiveCards.push(cards[i]);
			}
		}
		return archiveCards;
	}
}
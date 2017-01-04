import {Component} from "@angular/core";
import {NavController, NavParams} from "ionic-angular";
import {InfoPage} from "../info/info";
import {SwipePage} from "../swipe/swipe";
import {ArchivePage} from "../archive/archive";


export class Card {
	title: string;
	image: string;
	tagIds: string[];
	isStar: boolean;
	isArchive: boolean;
}

export class InfoCard extends Card {
	infoPage: string;
}

export class SwipeCard extends Card {
	candidateIds: string[];
}


@Component({
  templateUrl: 'home.html'
})

export class HomePage {

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

	icon: string = "../assets/img/icone-economie-24.png";

	cards: Array<InfoCard|SwipeCard> = [
		{
			title: "La fiscalite",
			image: "../assets/img/home-fiscalite.jpg",
			tagIds: [this.economieId],
			isStar: false,
			isArchive: false,
			infoPage: "../assets/img/info-fiscalite.png"
		},
		{
			title: "Le centre Cigéo",
			image: "../assets/img/home-cigeo.jpg",
			tagIds: [this.justiceId],
			isStar: false,
			isArchive: false,
			infoPage: "../assets/img/info-cigeo.png"
		},
		{
			title: "La primaire de la droite et du centre",
			image: "../assets/img/home-primaire.jpg",
			tagIds: [this.cultureId],
			isStar: false,
			isArchive: false,
			infoPage: "../assets/img/info-primaire-droite.png"
		},
		{
			title: "François Fillon | Alain Juppé",
			image: "../assets/img/home-primaire.jpg",
			tagIds: [this.numeriqueId],
			isStar: false,
			isArchive: false,
			candidateIds: [this.francoisFillonId, this.alainJuppeId]
		}
	];
	
	cardsRows: Array<InfoCard|SwipeCard>[] = this.putCardsInRows(this.getNoArchive(this.cards));
	starCardsRows: Array<InfoCard|SwipeCard>[] = this.putCardsInRows(this.getStars(this.getNoArchive(this.cards)));

	constructor(public nav: NavController) {
	}

// Navigation methods
	openCard(card: Card) {
		if (card instanceof InfoCard) {
			this.nav.push(InfoPage, {infoPage: card.infoPage});
		}
		else if (card instanceof SwipeCard) {
			this.nav.push(SwipePage, {tagIds: card.tagIds, candidateIds: card.candidateIds});
		}
	}

	goToArchivePage() {
		this.nav.push(ArchivePage, {home: this});
	}

// Action methods
	// Takes an array of cards and returns an array of rows (a row is an array of 2 cards)
	putCardsInRows(cards: Array<InfoCard|SwipeCard>) {
		var rows: Array<InfoCard|SwipeCard>[] = [];
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
		if (card.isStar == true) {
			card.isStar = false;
			this.starCardsRows = this.putCardsInRows(this.getStars(this.cards));
		}
		else if (card.isStar == false) {
			card.isStar = true;
			this.starCardsRows = this.putCardsInRows(this.getStars(this.cards));
		}
	}

	archiveCard(card: Card) {
		card.isArchive = true;
		this.cardsRows = this.putCardsInRows(this.getNoArchive(this.cards));
		this.starCardsRows = this.putCardsInRows(this.getNoArchive(this.getStars(this.cards)));
	}

// Getters
	getStars(cards: Array<InfoCard|SwipeCard>) {
		var starCards: Array<InfoCard|SwipeCard> = [];
		for (var i=0 ; i<cards.length ; i++) {
			if (cards[i].isStar == true) {
				starCards.push(cards[i]);
			}
		}
		return starCards;
	}

	getNoArchive(cards: Array<InfoCard|SwipeCard>) {
		var visibleCards: Array<InfoCard|SwipeCard> = [];
		for (var i=0 ; i<cards.length ; i++) {
			if (cards[i].isArchive == false) {
				visibleCards.push(cards[i]);
			}
		}
		return visibleCards;
	}

	getArchives(cards: Array<InfoCard|SwipeCard>) {
		var archiveCards: Array<InfoCard|SwipeCard> = [];
		for (var i=0 ; i<cards.length ; i++) {
			if (cards[i].isArchive == true) {
				archiveCards.push(cards[i]);
			}
		}
		return archiveCards;
	}
}
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
	id: number;
	type: CardType;
	title: string;
	image: string;
	icone: string;
	status: CardStatus;
	isArchive: CardIsArchive;
	info: string;
}

@Component({
  templateUrl: 'home.html'
})

export class HomePage {
	public cardType = CardType;
	public cardStatus = CardStatus;
	public cardIsArchive = CardIsArchive;

	cards: Card[] = [
		{
			id: 1,
			type: CardType.Info,
			title: "La fiscalite",
			image: "../assets/img/home-fiscalite.jpg",
			icone: "../assets/img/icone-economie-24.png",
			status: CardStatus.NoStar,
			isArchive: CardIsArchive.No,
			info: "../assets/img/info-fiscalite.png"
		},
		{
			id: 2,
			type: CardType.Info,
			title: "Le centre Cigéo",
			image: "../assets/img/home-cigeo.jpg",
			icone: "../assets/img/icone-environnement-24.png",
			status: CardStatus.NoStar,
			isArchive: CardIsArchive.No,
			info: "../assets/img/info-cigeo.png"
		},
		{
			id: 3,
			type: CardType.Info,
			title: "La primaire de la droite et du centre",
			image: "../assets/img/home-primaire.jpg",
			icone: "../assets/img/icone-institutions-24.png",
			status: CardStatus.NoStar,
			isArchive: CardIsArchive.No,
			info: "../assets/img/info-primaire-droite.png"
		}
	];
	
	cardsRows: Card[][] = this.putCardsInRows(this.getNoArchive(this.cards));
	starCardsRows: Card[][] = this.putCardsInRows(this.getStars(this.getNoArchive(this.cards)));

	constructor(public nav: NavController) {
	}

// Navigation methods
	openCard(card: Card) {
		if (card.type == CardType.Info) {
			this.nav.push(InfoPage, {id:card.id, title:card.title, info: card.info});
		}

		else if (card.type == CardType.Swipe) {
			this.nav.push(SwipePage);
			//{candId1: , candId2: , tagId: }
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
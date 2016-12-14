import {Component} from "@angular/core";
import {NavController} from "ionic-angular";
import {InfoPage} from "../info/info";
import {SwipePage} from "../swipe/swipe";
import {DoCheck} from "@angular/component";


export enum CardType {
	Info,
	Swipe
}

export enum CardStatus {
	Star,
	NoStar
}

export class Card {
	id: number;
	type: CardType;
	title: string;
	image: string;
	icone: string;
	status: CardStatus;
	info: string;
}

@Component({
  templateUrl: 'home.html'
})

export class HomePage {
	public cardType = CardType;
	public cardStatus = CardStatus;

	cards: Card[] = [
		{
			id: 1,
			type: CardType.Info,
			title: "La fiscalite",
			image: "../assets/img/home-fiscalite.jpg",
			icone: "../assets/img/icone-economie-24.png",
			status: CardStatus.NoStar,
			info: "../assets/img/info-fiscalite.png"
		},
		{
			id: 2,
			type: CardType.Info,
			title: "Le centre Cigéo",
			image: "../assets/img/home-cigeo.jpg",
			icone: "../assets/img/icone-environnement-24.png",
			status: CardStatus.NoStar,
			info: "../assets/img/info-cigeo.png"
		},
		{
			id: 3,
			type: CardType.Info,
			title: "La primaire de la droite et du centre",
			image: "../assets/img/home-primaire.jpg",
			icone: "../assets/img/icone-institutions-24.png",
			status: CardStatus.NoStar,
			info: "../assets/img/info-primaire-droite.png"
		},
	];
	
	cardsRows: Card[][] = this.putCardsInRows(this.cards);
	starCardsRows: Card[][] = this.putCardsInRows(this.getStars(this.cards));
	//shownCardsRows: Card[][];

	constructor(public nav: NavController) {
	}

	// ngOnChanges() {
	// 	this.cardsRows = this.putCardsInRows(this.cards);
	// 	this.starCardsRows = this.putCardsInRows(this.getStars(this.cards));
	// }

	openCard(card: Card) {
		if (card.type == CardType.Info) {
			this.nav.push(InfoPage, {id:card.id, title:card.title, info: card.info});
		}

		else if (card.type == CardType.Swipe) {
			this.nav.push(SwipePage);
			//{candId1: , candId2: , tagId: }
		}
	}

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

	starCard(card) {
		if (card.status == CardStatus.Star) {
			card.status = CardStatus.NoStar;
			this.starCardsRows = this.putCardsInRows(this.getStars(this.cards));
		}
		else if (card.status == CardStatus.NoStar) {
			card.status = CardStatus.Star;
			this.starCardsRows = this.putCardsInRows(this.getStars(this.cards));
		}
	}

	getStars(cards: Card[]) {
		var starCards: Card[] = [];
		for (var i=0 ; i<cards.length ; i++) {
			if (cards[i].status == CardStatus.Star) {
				starCards.push(cards[i]);
			}
		}
		return starCards;
	}

}
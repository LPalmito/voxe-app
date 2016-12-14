import {Component} from "@angular/core";
import {NavController} from "ionic-angular";
import {InfoPage} from "../info/info";
import {SwipePage} from "../swipe/swipe";


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
}

@Component({
  templateUrl: 'home.html'
})

export class HomePage {

	cards: Card[] = [
		{
			id: 1,
			type: CardType.Info,
			title: "Le revenu universel",
			image: "../assets/img/home-revenu-universel.jpg",
			icone: "../assets/img/icone-economie.png",
			status: CardStatus.NoStar
		},
		{
			id: 2,
			type: CardType.Info,
			title: "Le centre Cigéo",
			image: "../assets/img/home-cigeo.jpg",
			icone: "../assets/img/icone-environnement.png",
			status: CardStatus.Star
		}
	]

	starCards: Card[] = [
		{
			id: 2,
			type: CardType.Info,
			title: "Le centre Cigéo",
			image: "../assets/img/home-cigeo.jpg",
			icone: "../assets/img/icone-environnement.png",
			status: CardStatus.Star
		}
	]

	constructor(public nav: NavController) {
	}

	openCard(card) {
		if (card.type == CardType.Info) {
			this.nav.push(InfoPage);
			//{id: card.id}
		}
		else if (card.type == CardType.Swipe) {
			this.nav.push(SwipePage);
			//{candId1: , candId2: , tagId: }
		}
	}

	/*
	starCard(card) {
		if (card.status == CardStatus.Star) {
			card.status = CardStatus.NoStar;
			this.starCards.splice(0,this.starCards.indexOf(card));
		}
		else if (card.status == CardStatus.NoStar) {
			card.status = CardStatus.Star;
			this.starCards.unshift(card);
		}
	}
	*/
}
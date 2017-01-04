import {Component} from "@angular/core";
import {NavController, NavParams} from "ionic-angular";
import {Card, InfoCard, SwipeCard, HomePage} from "../home/home";

@Component({
  templateUrl: 'archive.html'
})

export class ArchivePage {

	home: HomePage = this.navParams.get('home');
	cardsRows: Array<InfoCard|SwipeCard>[] = this.home.putCardsInRows(this.home.getArchives(this.home.cards));
	icon: string = this.home.icon;

	constructor(public navParams: NavParams) {
	}

	restoreCard(card: Card) {
		card.isArchive = false;
		this.home.cardsRows = this.home.putCardsInRows(this.home.getNoArchive(this.home.cards));
		this.home.starCardsRows = this.home.putCardsInRows(this.home.getStars(this.home.getNoArchive(this.home.cards)));
		this.cardsRows = this.home.putCardsInRows(this.home.getArchives(this.home.cards));
	}
}

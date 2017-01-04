import {Component} from "@angular/core";
import {NavParams} from "ionic-angular";
import {HomePage} from "../home/home";
import {Card} from "../home/home";
import {CardIsArchive} from "../home/home";

@Component({
  templateUrl: 'archive.html'
})

export class ArchivePage {

	home: HomePage = this.navParams.get('home');
	cardsRows: Card[][] = this.home.putCardsInRows(this.home.getArchives(this.home.cards));

	constructor(public navParams: NavParams) {
	}

	restoreCard(card: Card) {
		card.isArchive = CardIsArchive.No;
		this.home.cardsRows = this.home.putCardsInRows(this.home.getNoArchive(this.home.cards));
		this.home.starCardsRows = this.home.putCardsInRows(this.home.getStars(this.home.getNoArchive(this.home.cards)));
		this.cardsRows = this.home.putCardsInRows(this.home.getArchives(this.home.cards));
	}
}

import {Component} from "@angular/core";
import {NavController, NavParams} from "ionic-angular";

@Component({
  templateUrl: 'info.html'
})

export class InfoPage {
	id: number = this.navParams.get('id');
	title: string = this.navParams.get('title');
	fiche: string = this.navParams.get('info');

	constructor(public navParams: NavParams) {
	}

}

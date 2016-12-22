import {Component} from "@angular/core";
import {NavController, NavParams} from "ionic-angular";

@Component({
  templateUrl: 'info.html'
})

export class InfoPage {
	infoPage: string = this.navParams.get('infoPage');

	constructor(public navParams: NavParams) {
	}
}

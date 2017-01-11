import {Component} from "@angular/core";
import {NavParams} from "ionic-angular";

@Component({
  templateUrl: 'info.html'
})

export class InfoPage {
	infoUrl: string = this.navParams.get('infoUrl');

	constructor(public navParams: NavParams) {
	}
}

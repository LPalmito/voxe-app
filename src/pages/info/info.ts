import {Component} from "@angular/core";
import {NavController} from "ionic-angular";

@Component({
  templateUrl: 'info.html'
})

export class InfoPage {
	id: 3;
	title: string = "La Primaire de la Droite et du Centre";
	img: string = "../assets/img/info-primaire-droite.png";

	constructor(public nav: NavController) {
	}
}

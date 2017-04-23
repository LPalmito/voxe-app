import {Component} from "@angular/core";
import {NavController} from "ionic-angular";
import {HomePage} from "../home/home";
import {AppStore} from "../../store";
import {Store} from "@ngrx/store";

@Component({
  templateUrl: 'tuto.html',
})

export class TutoPage {

	constructor(private nav: NavController, private store: Store<AppStore>) {
	}

	goHomeFromTuto() {
	  // TODO remove this comment if tuto is too annoying for users
		// this.store.dispatch({type: MARK_TUTO_DONE, payload: true});
		this.nav.push(HomePage);
	}
}

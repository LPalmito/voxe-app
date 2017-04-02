import {Component} from "@angular/core";
import {NavController} from "ionic-angular";
import {SwipePage} from "../swipe/swipe";
import {AppStore} from "../../store";
import {Store} from "@ngrx/store";
import {MARK_TUTO_DONE} from "../../reducers/is-tuto-done.reducer";

@Component({
  templateUrl: 'tuto.html',
})

export class TutoPage {

	constructor(private nav: NavController, private store: Store<AppStore>) {
	}

	goSwipe() {
		// this.store.dispatch({type: MARK_TUTO_DONE, payload: true});
		this.nav.push(SwipePage);
	}
}
import {Component, ViewChild} from "@angular/core";
import {Platform, Nav} from "ionic-angular";
import {StatusBar} from "ionic-native";
import {HomePage} from "../pages/home/home";
import {MainService} from "../services/main.service";
import {Store} from "@ngrx/store";
import {AppStore} from "../store";
import {SET_ELECTION} from "../reducers/election.reducer";

@Component({
  templateUrl: 'app.html'
})
export class VoxeApp {
  @ViewChild(Nav) nav: Nav;

  // make HomePage the root (or first) page
  rootPage: any = HomePage;

  constructor(public platform: Platform, private main: MainService, private store: Store<AppStore>) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      StatusBar.styleDefault();
      this.main.getElectionViaVoxe().subscribe(election => {
        this.store.dispatch({type: SET_ELECTION, payload: election});
      })
    });
  }
}

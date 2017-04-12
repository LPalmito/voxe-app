import {Component, ViewChild} from "@angular/core";
import {Platform, Nav} from "ionic-angular";
import {StatusBar} from "ionic-native";
import {TutoPage} from "../pages/tuto/tuto";
import {MainService} from "../services/main.service";
import {Store} from "@ngrx/store";
import {AppStore} from "../store";
import {SET_ELECTION} from "../reducers/election.reducer";
import {Splashscreen} from 'ionic-native';

@Component({
  templateUrl: 'app.html'
})
export class VoxeApp {
  @ViewChild(Nav) nav: Nav;

  // make TutoPage the root (or first) page
  rootPage: any = TutoPage;

  constructor(public platform: Platform, private main: MainService, private store: Store<AppStore>) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      StatusBar.styleDefault();
      this.hideSplashScreen();
      this.main.getElectionViaVoxe().subscribe(election => {
        this.store.dispatch({type: SET_ELECTION, payload: election});
      })
    });
  }

  hideSplashScreen() {
    if (Splashscreen) {
      setTimeout(() => {
        Splashscreen.hide();
      }, 100);
    }
  }
}

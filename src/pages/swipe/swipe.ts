import {Component, ViewChild, ViewChildren, QueryList} from '@angular/core';
import {AfterViewInit} from '@angular/component';
import {Http} from '@angular/http';
import 'rxjs/Rx';
import {StackConfig, SwingStackComponent, SwingCardComponent} from 'angular2-swing';
import {NavController} from "ionic-angular";
import {StatsPage} from "../stats/stats";
import { ToastController } from 'ionic-angular';
import {MainService} from "../../services/main.service";
import {PropositionService} from "../../services/propositions.service";

//!\\
// When launching "npm install angular2-swing@^0.7.1 --save"
// npm WARN optional SKIPPING OPTIONAL DEPENDENCY: fsevents@^1.0.0 (node_modules\chokidar\node_modules\fsevents):
// npm WARN notsup SKIPPING OPTIONAL DEPENDENCY: Unsupported platform for fsevents@1.0.15: wanted {"os":"darwin","arch":"any"} (current: {"os":"win32","arch":"x64"})

// TODO: Change the structure to accept the "ask" attribute
export interface Answer {
  candidateId: string,
  proposition: string,
  approved: boolean
}

// 'directives' does not exist in 'Component', use 'declarations' in 'NgModule' instead:
// http://stackoverflow.com/questions/39886792/directive-does-not-exist-in-type-component
@Component({
  templateUrl: 'swipe.html',
  providers: [PropositionService, MainService]
})

export class SwipePage {
  @ViewChild('myswing1') swingStack: SwingStackComponent;
  @ViewChildren('mycards1') swingCards: QueryList<SwingCardComponent>;

  // TODO: Create a 'Card' or 'Proposition' object?
  cards: Array<string> = [];
  lastCards: Array<string> = [];
  stackConfig: StackConfig;
  recentCard: string = '';
  answers: Answer[] = [];

  constructor(private http: Http, public nav: NavController, public toastCtrl: ToastController,
              private main: MainService, private propositionService: PropositionService) {
    this.stackConfig = {
      throwOutConfidence: (offset, element) => {
        return Math.min(Math.abs(offset) / (element.offsetWidth/2), 1);
      },
      transform: (element, x, y, r) => SwipePage.onItemMove(element, x, y, r),
      throwOutDistance: d => 800
    };
  }

  ngAfterViewInit() {
    // TODO: Move the requests properly to the services
    this.http.get("http://compare.voxe.org/api/v1/propositions/search?limit=10")
      .map(data => data.json().response.propositions)
      .subscribe(data => {
        this.cards = data.map(proposition => proposition.text);
      });
    this.main.getElection();
  }

  // TODO: Resolve the color bug when dragging but not coming back to white
  // Change the color when dragging a card
  static onItemMove(element, x, y, r) {
    var color = '';
    var abs = Math.abs(x);
    let min = Math.floor(Math.min(16*16 - abs, 16*16));
    let hexCode = SwipePage.decimalToHex(min, 2);
    color = (x < 0)?
      '#FF' + hexCode + hexCode:
      '#' + hexCode + 'FF' + hexCode;
    element.style.background = color;
    element.style['transform'] = `translate3d(0, 0, 0) translate(${x}px, ${y}px) rotate(${r}deg)`;
  }

  // Save the answer of the user
  voteUp(approved: boolean) {
    this.answers.push({
      candidateId: "test",
      proposition: this.cards[this.cards.length-1],
      approved: approved
    });
    this.lastCards.push(this.cards[this.cards.length-1]);
    this.cards.pop();
    this.infoToast(approved);
    // Redirect to the StatsPage after the last card
    if (this.cards.length == 0) {
      this.nav.push(StatsPage, {answers: this.answers});
    }
  }

  // Undo last action
  undo() {
    this.answers.pop();
    this.cards.push(this.lastCards[this.lastCards.length-1]);
    this.lastCards.pop();
    this.cancelToast();
  }

  // http://stackoverflow.com/questions/57803/how-to-convert-decimal-to-hex-in-javascript
  static decimalToHex(d, padding) {
    var hex = Number(d).toString(16);
    padding = typeof (padding) === "undefined" || padding === null ? padding = 2 : padding;
    while (hex.length < padding) {
      hex = "0" + hex;
    }
    return hex;
  }

  // Display a toast with the last swipe information
  infoToast(approved) {
    let toast = this.toastCtrl.create({
      message: approved? 'Proposition approuvée':'Proposition désapprouvée',
      duration: 2000,
    });
    toast.present();
  }

  // Display a toast with the cancel information on it
  cancelToast() {
    let toast = this.toastCtrl.create({
      message: "Opération annulée",
      duration: 2000,
    });
    toast.present();
  }
}

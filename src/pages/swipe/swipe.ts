import {Component, ViewChild, ViewChildren, QueryList} from '@angular/core';
import {AfterViewInit} from '@angular/component';
import 'rxjs/Rx';
import {StackConfig, SwingStackComponent, SwingCardComponent} from 'angular2-swing';
import {NavController, NavParams} from "ionic-angular";
import {StatsPage} from "../stats/stats";
import {ToastController } from 'ionic-angular';
import {PropositionService} from "../../services/propositions.service";
import {CandidateService} from "../../services/candidates.service";
import {Proposition} from "../../services/main.service";

// TODO: Change the structure to accept the "ask" attribute
export interface Answer {
  candidateId: string,
  proposition: Proposition,
  approved: boolean
}

// 'directives' does not exist in 'Component', use 'declarations' in 'NgModule' instead:
// http://stackoverflow.com/questions/39886792/directive-does-not-exist-in-type-component
@Component({
  templateUrl: 'swipe.html',
})

export class SwipePage {
  @ViewChild('myswing1') swingStack: SwingStackComponent;
  @ViewChildren('mypropositions1') swingPropositions: QueryList<SwingCardComponent>;

  propositions: Array<Proposition> = [];
  lastPropositions: Array<Proposition> = [];
  stackConfig: StackConfig;
  //propositions: Array<string> = [];
  //lastPropositions: Array<string> = [];
  answers: Answer[] = [];
  candidacyIds: string[];
  tagIds: string[];

  // TODO: Replace it by randomized generated ids
  // francoisFillonId = "578f480ab0bba9398100000b";
  // alainJuppeId = "57962957793b3f868d000012";
  // emploiId = "4ef479f9bc60fb000400009a";
  // economieId = "4ef479f9bc60fb00040000aa";
  // financeId = "4ef479f9bc60fb00040000be";
  // europeId = "4ef479fcbc60fb0004000204";
  // educationId = "4ef479f9bc60fb0004000052";
  // cultureId = "578504e585b1a8f7f6000094";
  // numeriqueId = "4ef479f8bc60fb000400002c";
  // justiceId = "4ef479f9bc60fb00040000cc";

  constructor(public nav: NavController, public navParams: NavParams, public toastCtrl: ToastController,
              private propositionService: PropositionService, private candidateService: CandidateService
  ) {
    this.stackConfig = {
      throwOutConfidence: (offset, element) => {
        return Math.min(Math.abs(offset) / (element.offsetWidth/2), 1);
      },
      transform: (element, x, y, r) => SwipePage.onItemMove(element, x, y, r),
      throwOutDistance: d => 800
    };
    this.candidacyIds = this.navParams.get('candidacyIds');
    this.tagIds = this.navParams.get('tagIds');
  }

  ngAfterViewInit() {
    this.candidateService.getCandidates();
    this.propositionService.getPropositionForSwipe(this.candidacyIds, this.tagIds)
      .subscribe(data => this.propositions = data);
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
      candidacyId: "test",
      proposition: this.propositions[this.propositions.length-1],
      approved: approved
    });
    this.lastPropositions.push(this.propositions[this.propositions.length-1]);
    this.propositions.pop();
    // Redirect to the StatsPage after the last card
    if (this.propositions.length == 0) {
      this.nav.push(StatsPage, {answers: this.answers, candidacyIds: this.candidacyIds, tagIds: this.tagIds});
    }
  }

  // Undo last action
  undo() {
    this.answers.pop();
    this.propositions.push(this.lastPropositions[this.lastPropositions.length-1]);
    this.lastPropositions.pop();
    this.cancelToast();
  }

  // TODO: Change the colors
  // http://stackoverflow.com/questions/57803/how-to-convert-decimal-to-hex-in-javascript
  static decimalToHex(d, padding) {
    var hex = Number(d).toString(16);
    padding = typeof (padding) === "undefined" || padding === null ? padding = 2 : padding;
    while (hex.length < padding) {
      hex = "0" + hex;
    }
    return hex;
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

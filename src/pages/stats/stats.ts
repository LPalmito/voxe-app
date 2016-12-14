import {Component} from "@angular/core";
import {Answer} from "../swipe/swipe";
import {NavParams} from "ionic-angular";
import {NavController} from "ionic-angular";
import {HomePage} from "../home/home";

@Component({
  templateUrl: 'stats.html'
})
export class StatsPage {
  answers: Answer[];
  displayAnswers = {};

  constructor(navParams: NavParams, public navCtrl: NavController) {
    this.answers = navParams.get('answers');
    this.answers.forEach(answer => {
      if(this.displayAnswers[answer.candidateId] == null)
        this.displayAnswers[answer.candidateId] = {yes: [], no: []};
      answer.approved?
        this.displayAnswers[answer.candidateId].yes.push(answer.proposition):
        this.displayAnswers[answer.candidateId].no.push(answer.proposition);
    }
    );
  }
  goToHomePage() {
    this.navCtrl.push(HomePage)
  }
}



import {Component} from "@angular/core";
import {Answer} from "../swipe/swipe";
import {NavParams} from "ionic-angular";

@Component({
  templateUrl: 'stats.html'
})
export class StatsPage {
  answers: Answer[];
  displayAnswers = {};

  constructor(navParams: NavParams) {
    this.answers = navParams.get('answers');
    this.answers.forEach(answer => {
      if(this.displayAnswers[answer.candidateId] == null)
        this.displayAnswers[answer.candidateId] = {yes: [], no: []};
      answer.approved?
        this.displayAnswers[answer.candidateId].yes.push(answer.proposition):
        this.displayAnswers[answer.candidateId].no.push(answer.proposition);
    });
  }

}

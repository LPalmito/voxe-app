import {Component} from "@angular/core";
import {Answer} from "../swipe/swipe";
import {NavParams} from "ionic-angular";
import {NavController} from "ionic-angular";
import {HomePage} from "../home/home";
// import {Candidate, Tag} from "../../services/main.service";

@Component({
  templateUrl: 'stats.html'
})

//TODO: Homogénéiser les noms (candidate->candidacy, theme->tag, etc) avec les autres pages
export class StatsPage {
  candidateInfo = {candidateOneID : 'test', candidateTwoId : 'test2'};
  themeInfo = {themeID: 5};
  displayCandidateInfo = {};
  displayThemeInfo = {};
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
    });
    this.displayCandidateInfo[this.candidateInfo.candidateOneID] = {name : "Yannick Jadot", photo: "../assets/img/candidat-jadot.jpg"};
    this.displayCandidateInfo[this.candidateInfo.candidateTwoId] = {name : "Karima Delli", photo: "../assets/img/candidat-delli.jpg"};
    this.displayThemeInfo[this.themeInfo.themeID] = {name: "Environnement et agriculture", photo: "../assets/img/icone-environnement.png"};
  }
  goToHomePage() {
    this.navCtrl.push(HomePage)
  }
}

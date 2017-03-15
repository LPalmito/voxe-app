import {Component} from "@angular/core";
import {Answer} from "../swipe/swipe";
import {HomePage} from "../home/home";
import {AppStore} from "../../store";
import {Store} from "@ngrx/store";
import {CandidateService} from "../../services/candidates.service";
import {Tag, Candidate, Candidacy, MainService} from "../../services/main.service";
import {TagService} from "../../services/tags.service";
import {NavController} from "ionic-angular";

@Component({
  templateUrl: 'stats.html'
})

export class StatsPage {
  tags: Tag[] = [];
  candidacies: Candidacy[] = [];
  candidates: Candidate[] = [];
  answers: Answer[] = [];
  displayAnswers = {}; // candidacyIds as keys, {yes: Proposition[], no: Proposition[], photo: string, name: string} as values

  constructor(public store: Store<AppStore>, public main: MainService, public nav: NavController,
              private candidateService: CandidateService, private tagService: TagService) {

    // Get answers
    this.main.answers.subscribe(x => this.answers = <Array<Answer>>x);

    // Get tags
    this.tagService.tagIds.subscribe(tagIds => tagIds.forEach(tagId => {
      this.tagService.getTagById(tagId).subscribe(tag => this.tags.push(tag));
    }));

    // Get candidates
    this.candidateService.candidacyIds.subscribe(candidacyIds => candidacyIds.forEach(candidacyId => {
      this.candidateService.getCandidacyById(candidacyId).subscribe(candidacy => {
        this.candidacies.push(candidacy);
        this.candidates.push(candidacy.candidates[0]);
      })
    }));

    // Create the displayAnswers object
    this.answers.forEach(answer => {
      if(this.displayAnswers != {} && this.displayAnswers[answer.proposition.candidacy.id] == null) {
        let photo = this.candidacies
          .filter(x => x.id == answer.proposition.candidacy.id)
          .map(x => x.candidates[0].photo)[0];
        this.displayAnswers[answer.proposition.candidacy.id] = {yes: [], no: [], photo: photo, name: ""};
      }
      answer.approved?
        this.displayAnswers[answer.proposition.candidacy.id].yes.push(answer.proposition):
        this.displayAnswers[answer.proposition.candidacy.id].no.push(answer.proposition);
      let name = this.candidacies
        .filter(x => x.id == answer.proposition.candidacy.id)
        .map(x => x.candidates[0].firstName + " " + x.candidates[0].lastName)[0];
      this.displayAnswers[answer.proposition.candidacy.id].name = name;
    });
  }

  // Helper to get the url of a tag icon (for the size: 0 <-> 32, 1 <-> 64)
  getIcon(tag: Tag, size: number): string {
    return tag.icon.prefix + tag.icon.sizes[size] + tag.icon.name;
  }

  goHome() {
    this.nav.setRoot(HomePage);
  }
}

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
  tags: Tag[];
  candidacies: Candidacy[];
  candidates: Candidate[];
  answers: Answer[];
  displayAnswers = {}; // candidacyIds as keys, {yes: tagId[], no: tagId[], photo: string} as values

  constructor(public store: Store<AppStore>, public main: MainService, public nav: NavController,
              private candidateService: CandidateService, private tagService: TagService) {
    // Get answers
    this.main.answers.subscribe(x => this.answers = <Array<Answer>>x);
    // Get tags
    this.tagService.tagIds.subscribe(tagIds => tagIds.forEach(tagId => {
      this.tagService.getTagById(tagId).map(tag => this.tags.push(tag));
    }));
    // Get candidates
    this.candidateService.candidacyIds.subscribe(candidacyIds => candidacyIds.forEach(candidacyId => {
      this.candidateService.getCandidacyById(candidacyId).map(candidacy => {
        this.candidacies.push(candidacy);
        this.candidates.push(candidacy.candidates[0]);
      })
    }));
    // Create the displayAnswers object
    this.answers.forEach(answer => {
      if(this.displayAnswers[answer.proposition.candidacy.id] == null) {
        let photo = this.candidacies
          .filter(x => x.id == answer.proposition.candidacy.id)
          .map(x => x.candidates[0].photo)[0];
        this.displayAnswers[answer.proposition.candidacy.id] = {yes: [], no: [], photo: photo};
      }
      answer.approved?
        this.displayAnswers[answer.proposition.candidacy.id].yes.push(answer.proposition):
        this.displayAnswers[answer.proposition.candidacy.id].no.push(answer.proposition);
    });
  }

  // Helper to get the url of a tag icon (for the size: 0 <-> 32, 1 <-> 64)
  getIcon(tag: Tag, size: number): string {
    return tag.icon.prefix + tag.icon.sizes[size] + tag.icon.name;
  }

  // Helper to get the url of a candidate photo: candidate.photo[size] (for the size: 'small' <-> 50, 'medium' <-> 100, 'large' <-> 300)
  getPhoto(candidate: Candidate, size: string): string {
    return candidate.photo[size];
  }

  goHome() {
    this.nav.push(HomePage);
    // this.store.dispatch({type: GO_TO, payload: HomePage});
  }
}

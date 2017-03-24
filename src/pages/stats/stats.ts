import {Component} from "@angular/core";
import {Answer} from "../swipe/swipe";
import {HomePage, SwipeCard} from "../home/home";
import {AppStore} from "../../store";
import {Store} from "@ngrx/store";
import {CandidateService} from "../../services/candidates.service";
import {Tag, Candidate, Candidacy, MainService, Proposition} from "../../services/main.service";
import {TagService} from "../../services/tags.service";
import {NavController} from "ionic-angular";
import {PUSH_ANSWER} from "../../reducers/answers.reducer";
import {MARK_CARD_DONE} from "../../reducers/cards.reducer";

@Component({
  templateUrl: 'stats.html'
})

export class StatsPage {
  activeCard: SwipeCard;
  tags: Tag[] = [];
  candidacies: Candidacy[] = [];
  candidates: Candidate[] = [];
  answers: Answer[] = [];
  displayAnswers = {}; // candidacyIds as keys, {yes: Proposition[], no: Proposition[], photo: string, name: string} as values

  constructor(public store: Store<AppStore>, public main: MainService, public nav: NavController,
              private candidateService: CandidateService, private tagService: TagService) {

    // Look for active card
    this.main.cards.subscribe(cards => {
      if (cards != undefined) {
        this.activeCard = <SwipeCard> this.main.getCurrentCard(cards);
      }
    });

    if (this.activeCard.hasBeenDone) {
      this.tags = this.activeCard.stats.tags;
      this.candidacies = this.activeCard.stats.candidacies;
      this.candidates = this.activeCard.stats.candidates;
      this.answers = this.activeCard.stats.answers;
      this.displayAnswers = this.activeCard.stats.displayAnswers;
    }

    else {
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

      // TODO displayAnswers and answers objects need to be merged in a clearer object
      // Create the displayAnswers object
      // First loop to create an element in displayAnswers for each candidate
      for (let i = 0; i < 2; i++) {
        let photo = this.candidacies
          .filter(x => x.id == this.candidacies[i].id)
          .map(x => x.candidates[0].photo)[0];
        let name = this.candidacies
          .filter(x => x.id == this.candidacies[i].id)
          .map(x => x.candidates[0].firstName + " " + x.candidates[0].lastName)[0];
        this.displayAnswers[this.candidacies[i].id] = {yes: [], no: [], photo: photo, name: name};
      }
      // Add propositions to displayAnswers Object
      this.answers.forEach(answer => {
        answer.approved ?
          this.displayAnswers[answer.proposition.candidacy.id].yes.push(answer.proposition) :
          this.displayAnswers[answer.proposition.candidacy.id].no.push(answer.proposition);
      });
      // If no proposition are found for a candidate, add a default Proposition, stating that we don't have proposition for this candidate
      for (let i = 0; i < 2; i++) {
        if (!this.displayAnswers[this.candidacies[i].id].yes.length && !this.displayAnswers[this.candidacies[i].id].no.length) {
          let defaultProposition: Proposition = {
            id: "default",
            text: "Nous n'avons pas de proposition pour ce candidat sur ce thème.",
            favorite_users_count: 0,
            against_users_count: 0,
            support_users_count: 0,
            tags: [{id: "default"}],
            comments: {count: 0},
            favorite_users: {count: 0, data: ["default"]},
            against_users: {count: 0, data: ["default"]},
            support_users: {count: 0, data: ["default"]},
            candidacy: {id: this.candidacies[i].id},
            embeds: ["default"]
          };
          this.displayAnswers[this.candidacies[i].id].yes.push(defaultProposition);
          this.store.dispatch({type: PUSH_ANSWER, payload: {proposition: defaultProposition, approved: true}});
        }
      }

      this.store.dispatch({type: MARK_CARD_DONE, payload: {card: this.activeCard, stats: {
        tags: this.tags,
        candidacies: this.candidacies,
        candidates: this.candidates,
        answers: this.answers,
        displayAnswers: this.displayAnswers
      }}});
    }
  }

  // Helper to get the url of a tag icon (for the size: 0 <-> 32, 1 <-> 64)
  getIcon(tag: Tag, size: number): string {
    return tag.icon.prefix + tag.icon.sizes[size] + tag.icon.name;
  }

  goHome() {
    this.nav.setRoot(HomePage);
  }
}

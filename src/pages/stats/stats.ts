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
import {MARK_CARD_DONE, ARCHIVE_CARD} from "../../reducers/cards.reducer";

@Component({
  templateUrl: 'stats.html'
})

export class StatsPage {
  activeCard: SwipeCard;
  tags: Tag[] = [];
  candidacies: Candidacy[] = [];
  answers: Answer[] = [];

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
      this.answers = this.activeCard.stats.answers;
    }

    else {
      // Get answers from the store
      this.main.answers.subscribe(x => {this.answers = <Array<Answer>> x});

      // Get tags according to tagIds from the store
      this.tagService.tagIds.subscribe(tagIds => tagIds.forEach(tagId => {
        this.tagService.getTagById(tagId).subscribe(tag => this.tags.push(tag));
      }));

      // Get candidacies according to candidacyIds from the store
      this.candidateService.candidacyIds.subscribe(candidacyIds => candidacyIds.forEach(candidacyId => {
        this.candidacies.push(this.candidateService.getCandidacyById(candidacyId));
      }));

      this.store.dispatch({type: MARK_CARD_DONE, payload: {card: this.activeCard, stats: {
        tags: this.tags,
        candidacies: this.candidacies,
        answers: this.answers,
      }}});
    }
  }

  // size : 0 <=> 32, 1 <=> 64
  getIcon(tag: Tag, size: number): string {
    return this.tagService.getIcon(tag,size);
  }

  getAnswers(candidacy: Candidacy, approved: boolean): Answer[] {
    return this.answers.filter(answer => answer.approved == approved && answer.proposition.candidacy.id == candidacy.id);
  }

  getCandidatesWithoutProposition(): string[] {
    return this.candidacies
      .filter(
        candidacy => this.answers.map(answer => answer.proposition.candidacy.id).indexOf(candidacy.id) == -1
      )
      .map(
        candidacy => this.getName(candidacy.candidates[0])
      );
  }

  getCandidate(candidacyId: string) {
    return this.candidacies.filter(candidacy => candidacy.id == candidacyId)[0].candidates[0];
  }

  getName(candidate: Candidate): string {
    return candidate.firstName + " " + candidate.lastName;
  }

  // size: 0 <=> small, 1 <=> medium, 2 <=> large
  getPhoto(candidate: Candidate, size: number): string {
    let photo0 = candidate.photo.sizes;
    let photo1;
    switch(size) {
      case 0:
        photo1 = photo0.small;
      case 1:
        photo1 = photo0.medium;
      case 2:
        photo1 = photo0.large;
      default:
        photo1 = photo0.small;
    }
    return photo1.url;
  }

  goHome() {
    this.nav.setRoot(HomePage);
  }

  archiveCard(card: SwipeCard) {
      this.store.dispatch({type: ARCHIVE_CARD, payload: card});
  }
}


//   // If no proposition are found for a candidate, add a default Proposition, stating that we don't have proposition for this candidate
//   for (let i=0; i<2; i++) {
//     if (!this.oldDisplayAnswers[this.candidacies[i].id].yes.length && !this.oldDisplayAnswers[this.candidacies[i].id].no.length){
//       let defaultProposition: Proposition = {
//         id: "default",
//         text: "Nous n'avons pas de proposition pour ce candidat sur ce thème.",
//         favorite_users_count: 0,
//         against_users_count: 0,
//         support_users_count: 0,
//         tags: [{id: "default"}],
//         comments: {count: 0},
//         favorite_users: {count: 0, data: ["default"]},
//         against_users: {count: 0, data: ["default"]},
//         support_users: {count: 0, data: ["default"]},
//         candidacy: {id: this.candidacies[i].id},
//         embeds: ["default"]
//       };
//       this.oldDisplayAnswers[this.candidacies[i].id].yes.push(defaultProposition);
//       this.store.dispatch({type: PUSH_ANSWER, payload: {proposition: defaultProposition, approved: true}});
//     }
//   }


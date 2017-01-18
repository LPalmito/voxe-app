import {NavController} from "ionic-angular";
import {Proposition, Candidate} from "./services/main.service";
import {InfoCard, SwipeCard, CardType} from "./pages/home/home";
import {Answer} from "./pages/swipe/swipe";

export class AppStore {

  nav: NavController;                      // For navigation purposes

  // TODO: Add an "election" object instead of those two?
  electionNameSpace: string;               // NameSpace of the election
  candidates: Candidate[];                 // Election's candidates
  propositions: Proposition[];             // Elections's propositions

  cards: Array<InfoCard|SwipeCard>;        // All cards (home + archive)

  infoUrl: string;                         // Info card's URL

  tagIds: string[];                        // Swipe tag ids
  candidacyIds: string[];                  // Swipe candidacy ids

  swipePropositions: Proposition[];        // Propositions to swipe
  donePropositions: Proposition[];         // Propositions already swiped
  answers: Answer[];                       // Proposition's answers

}

import {NavController} from "ionic-angular";
import {Proposition, Election} from "./services/main.service";
import {InfoCard, SwipeCard} from "./pages/home/home";
import {Answer} from "./pages/swipe/swipe";

export interface AppStore {

  // TODO: Deal with the evil nav controller
  nav: NavController;                     // For navigation purposes

  election: Election                      // Chosen election
  propositions: Proposition[]             // Elections's propositions

  cards: Array<InfoCard|SwipeCard>;       // All cards (home + archive)

  infoUrl: string[];                        // Info card's URL

  tagIds: string[];                       // Swipe tag ids
  candidacyIds: string[];                 // Swipe candidacy ids

  toSwipePropositions: Proposition[]      // Propositions to swipe
  swipedPropositions: Proposition[]       // Propositions already swiped
  answers: Answer[]                       // Propositions already swiped answers

}

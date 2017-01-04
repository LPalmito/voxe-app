import {NavController} from "ionic-angular";
import {Candidacy, Proposition} from "./services/main.service";
import {InfoCard, SwipeCard} from "./pages/home/home";
import {Answer} from "./pages/swipe/swipe";

export interface AppStore {

  nav: NavController                      // Pour la navigation entre les pages

  electionNameSpace: string               // NameSpace de l’élection concernée
  candidacies: Candidacy[]                // Candidatures à l’élection

  homeCards: Array<InfoCard|SwipeCard>    // Cards de la home

  infoUrl: string                         // URL de l’info

  tagIds: string[]                        // Ids des tags du swipe
  candidacyIds: string[]                  // Ids des candidatures du swipe

  swipePropositions: Proposition[]        // Propositions à swiper
  donePropositions: Proposition[]         // Propositions déjà swipées
  answers: Answer[]                       // Réponses aux propositions

}

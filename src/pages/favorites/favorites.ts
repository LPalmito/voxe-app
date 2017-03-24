import {Component} from "@angular/core";
import {InfoCard, SwipeCard, HomePage, CardType} from "../home/home";
import {Store} from "@ngrx/store";
import {AppStore} from "../../store";
import {MainService} from "../../services/main.service";
import {NavController} from "ionic-angular";
import {SET_INFO_URL} from "../../reducers/info-url.reducer";
import {SET_INFO_TYPE} from "../../reducers/info-type.reducer";
import {ACTIVE_CARD} from "../../reducers/cards.reducer";
import {InfoPage} from "../info/info";
import {SET_TAG_IDS} from "../../reducers/tag-ids.reducer";
import {SET_CANDIDACY_IDS} from "../../reducers/candidacy-ids.reducer";
import {SwipePage} from "../swipe/swipe";

@Component({
  templateUrl: 'favorites.html'
})

export class FavoritesPage {

  starCardsRows: Array<InfoCard|SwipeCard>[];

  constructor(private main: MainService, public store: Store<AppStore>, public nav: NavController) {
    this.main.cards.subscribe(data => this.starCardsRows = this.main.putCardsInRows(this.main.getStars(this.main.getNoArchive(data))));
  }

  goToHomePage() {
    this.nav.setRoot(HomePage);
  }

  openCard(card: InfoCard|SwipeCard) {
    if (card.type == CardType.Info) {
      let infoCard = <InfoCard> card;
      this.store.dispatch({type: SET_INFO_URL, payload: infoCard.infoUrl});
      this.store.dispatch({type: SET_INFO_TYPE, payload: infoCard.isHTML});
      this.store.dispatch({type: ACTIVE_CARD, payload: card});
      this.nav.push(InfoPage);
      // this.store.dispatch({type: GO_TO, payload: InfoPage});
    }
    else if (card.type == CardType.Swipe) {
      let swipeCard = <SwipeCard> card;
      this.store.dispatch({type: ACTIVE_CARD, payload: card});
      this.store.dispatch({type: SET_TAG_IDS, payload: swipeCard.tagIds});
      this.store.dispatch({type: SET_CANDIDACY_IDS, payload: swipeCard.candidacyIds});
      this.nav.push(SwipePage);
      // this.store.dispatch({type: GO_TO, payload: SwipePage});
    }
  }

  isSwipeCard(card: InfoCard|SwipeCard) {
    return card.type == CardType.Swipe;
  }

}

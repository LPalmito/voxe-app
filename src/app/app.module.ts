import {NgModule, ErrorHandler} from "@angular/core";
import {IonicApp, IonicModule, IonicErrorHandler} from "ionic-angular";
import {VoxeApp} from "./app.component";
import {HomePage} from "../pages/home/home";
import {SwipePage} from "../pages/swipe/swipe";
import {StatsPage} from "../pages/stats/stats";
import {InfoPage} from "../pages/info/info";
import {ArchivePage} from "../pages/archive/archive";
import {SwingStackComponent} from "angular2-swing";
import {SwingCardComponent} from "angular2-swing";
import {MainService} from "../services/main.service";
import {CandidateService} from "../services/candidates.service";
import {TagService} from "../services/tags.service";
import {PropositionService} from "../services/propositions.service";
import {answers} from "../reducers/answers.reducer";
import {cards} from "../reducers/cards.reducer";
import {swipedPropositions} from "../reducers/swiped-propositions.reducer";
import {election} from "../reducers/election.reducer";
import {infoUrl} from "../reducers/info-url.reducer";
import {toSwipePropositions} from "../reducers/to-swipe-propositions.reducer";
import {tagIds} from "../reducers/tag-ids.reducer";
import {candidacyIds} from "../reducers/candidacy-ids.reducer";
import {nav} from "../reducers/nav.reducer";
import {propositions} from "../reducers/propositions.reducer";
import {JsonpModule} from "@angular/http";
import {IonicStorageModule} from "@ionic/storage";
import {isHTML} from "../reducers/info-type.reducer";
import {InfoCardsService} from "../services/info-cards.service";
import { compose } from '@ngrx/core/compose';
import { StoreModule, combineReducers } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StorageSyncEffects, storageSync } from 'ngrx-store-ionic-storage';
import {DatabaseService} from "../services/database.service";


function onSyncError(err) {
  console.log(err);
}

const reducers = {
  nav: nav,
  answers: answers,
  cards: cards,
  swipedPropositions: swipedPropositions,
  election: election,
  infoUrl: infoUrl,
  isHTML: isHTML,
  toSwipePropositions: toSwipePropositions,
  tagIds: tagIds,
  candidacyIds: candidacyIds,
  propositions: propositions
};

const storageSyncReducer = storageSync({
  keys: [
    'nav',
    'answers',
    'cards',
    'swipedPropositions',
    'election',
    'infoUrl',
    'isHTML',
    'toSwipePropositions',
    'tagIds',
    'candidacyIds',
    'propositions'
  ],
  ignoreActions: [],
  hydratedStateKey: 'hydrated', // Add this key to the state
  onSyncError: onSyncError      // If a sync fails
});

const appReducer = compose(storageSyncReducer, combineReducers)(reducers);
import {FavoritesPage} from "../pages/favorites/favorites";

@NgModule({
  declarations: [
    VoxeApp,
    HomePage,
    SwipePage,
    StatsPage,
    InfoPage,
    ArchivePage,
    FavoritesPage,
    SwingStackComponent,
    SwingCardComponent
  ],
  imports: [
    JsonpModule,
    IonicModule.forRoot(VoxeApp),
    IonicStorageModule.forRoot({
      name: 'VoxeAppDB',
      driverOrder: ['sqlite']
    }),
    StoreModule.provideStore(appReducer),
    EffectsModule.run(StorageSyncEffects)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    VoxeApp,
    HomePage,
    InfoPage,
    ArchivePage,
    FavoritesPage,
    SwipePage,
    StatsPage,
  ],
  providers: [
    MainService,
    CandidateService,
    PropositionService,
    TagService,
    InfoCardsService,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    DatabaseService
  ]
})

export class AppModule {}

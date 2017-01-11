import {NgModule} from "@angular/core";
import {IonicApp, IonicModule} from "ionic-angular";
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
import {provideStore} from '@ngrx/store';
import {answers} from "../reducers/answers.reducer";
import {cards} from "../reducers/cards.reducer";
import {donePropositions} from "../reducers/done-propositions.reducer";
import {electionNameSpace} from "../reducers/election-name-space.reducer";
import {infoUrl} from "../reducers/info-url.reducer";
import {server} from "../reducers/server.reducer";
import {swipePropositions} from "../reducers/swipe-propositions.reducer";
import {tagIds} from "../reducers/tag-ids.reducer";
import {candidacyIds} from "../reducers/candidacy-ids.reducer";


@NgModule({
  declarations: [
    VoxeApp,
    HomePage,
    SwipePage,
    StatsPage,
    InfoPage,
    ArchivePage,
    SwingStackComponent,
    SwingCardComponent
  ],
  imports: [
    IonicModule.forRoot(VoxeApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    VoxeApp,
    HomePage,
    InfoPage,
    ArchivePage,
    SwipePage,
    StatsPage
  ],
  providers: [
    provideStore({
      answers,
      cards,
      donePropositions,
      electionNameSpace,
      infoUrl,
      server,
      swipePropositions,
      tagIds,
      candidacyIds
    }),
    MainService,
    CandidateService,
    PropositionService,
    TagService,
  ]
})

export class AppModule {}

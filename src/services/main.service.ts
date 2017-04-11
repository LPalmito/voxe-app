import {Injectable} from "@angular/core";
import {Jsonp} from '@angular/http';
import {Observable} from "rxjs";
import 'rxjs/Rx';
import {Store} from "@ngrx/store";
import {AppStore} from "../store";
import {NavController} from "ionic-angular";
import {InfoCard, SwipeCard, CardType} from "../pages/home/home";
import {Answer} from "../pages/swipe/swipe";
import {SET_ANSWERS} from "../reducers/answers.reducer";
import {SET_TO_SWIPE_PROPOSITIONS} from "../reducers/to-swipe-propositions.reducer";
import {SET_CANDIDACY_IDS} from "../reducers/candidacy-ids.reducer";
import {SET_TAG_IDS} from "../reducers/tag-ids.reducer";
import {SET_CARDS} from "../reducers/cards.reducer";
import {SET_PROPOSITIONS} from "../reducers/propositions.reducer";
import {SET_ELECTION} from "../reducers/election.reducer";
import {MARK_TUTO_DONE} from "../reducers/is-tuto-done.reducer";

export interface DataElections {
  meta: {code: number},
  response: {elections: Election[]}
}

export interface DataPropositions {
  meta: {code: number},
  response: {proposition: Proposition[]}
}

export interface Election {
  id: string,
  name: string,
  namespace: string,
  published: boolean,
  date: string,
  candidacies: Candidacy[],
  country: {name: string, namespace: string},
  tags: Tag[]
}

export interface Candidacy {
  id: string,
  published: boolean,
  namespace: string,
  candidates: Candidate[],
  candidacy_candidate_profile: CandidacyCandidateProfile
}

export interface Candidate {
  id: string,
  namespace: string,
  firstName: string,
  lastName: string,
  photo: Photo
}

export interface CandidacyCandidateProfile {
  name: string,
  phone: number,
  birthday: string,
  email: string,
  address: string,
  postal_code: number,
  biography: string,
  introduction: string,
  twitter: string,
  facebook: string,
  youtube: string,
  wikipedia: string,
  website: string,
  cibul: string,
  political_party: string
}

export interface Photo {
  sizes: {
    small: {url: string},
    medium: {url: string},
    large: {url: string}
  }
}

export interface Tag {
  position: number,
  id: string,
  name: string,
  namespace: string,
  icon: Icon
}

export interface Icon {
  prefix: string,
  sizes: number[],
  name: string
}

export interface Proposition {
  id: string,
  text: string,
  favorite_users_count: number,
  against_users_count: number,
  support_users_count: number,
  tags: {id: string}[],
  comments: {count: number},
  favorite_users: {count: number, data: string[]},
  against_users: {count: number, data: string[]},
  support_users: {count: number, data: string[]},
  candidacy: {id: string},
  embeds: string[]
}

@Injectable()
export class MainService {
  callback = "?callback=JSONP_CALLBACK";
  server = "http://compare.voxe.org/api/v1/";
  electionId = "58b45ad7b7286e2fe000001f";
  election: Observable<Election>;
  nav: Observable<NavController>;
  cards: Observable<Array<InfoCard|SwipeCard>>;
  infoUrl: Observable<Array<string>>;
  isHTML: Observable<boolean>;
  answers: Observable<Array<Answer>>;
  isTutoDone: Observable<boolean>;

  all_candidacyIds: string[] = [];
  all_tagIds: string[] = [];

  constructor(private jsonp: Jsonp, private store: Store<AppStore>) {
    this.election = store.select('election');
    this.nav = store.select('nav');
    this.cards = store.select('cards');
    this.infoUrl = store.select('infoUrl');
    this.isHTML = store.select('isHTML');
    this.answers = store.select('answers');
    this.isTutoDone = store.select('isTutoDone');

    this.election.subscribe(election => {
      if (election != undefined) {
        this.all_candidacyIds = election.candidacies
          .filter(c => c.id != "58beb414f110d477c200009b" && c.id != "58c11879b19d2ff24d00002d")
          .map(c => c.id);
        this.all_tagIds = election.tags.map(t => t.id);
      }
    });
  }

  initStore(data: AppStore) {
    if(data) {
      if(data.election)
        this.store.dispatch({type: SET_ELECTION, payload: data.election});
      if(data.propositions)
        this.store.dispatch({type: SET_PROPOSITIONS, payload: data.propositions});
      if(data.cards)
        this.store.dispatch({type: SET_CARDS, payload: data.cards});
      if(data.tagIds)
        this.store.dispatch({type: SET_TAG_IDS, payload: data.tagIds});
      if(data.candidacyIds)
        this.store.dispatch({type: SET_CANDIDACY_IDS, payload: data.candidacyIds});
      if(data.toSwipePropositions)
        this.store.dispatch({type: SET_TO_SWIPE_PROPOSITIONS, payload: data.toSwipePropositions});
      if(data.answers)
        this.store.dispatch({type: SET_ANSWERS, payload: data.answers});
      if(data.isTutoDone)
        this.store.dispatch({type: MARK_TUTO_DONE, payload: data.isTutoDone});
    }
  }

  getElectionViaVoxe(): Observable<Election> {
    return this.jsonp.get(this.server+'elections/'+this.electionId+this.callback)
      .map(data => data.json().response.election);
  }

  // Helper which transforms an array of observables in an observable of an array
  arrObs2ObsArr(arrObs: Array<Observable<any>>): Observable<Array<any>> {
    return Observable.from(arrObs).flatMap(x => x);
  }

  // Getters
  getSwipeCards(cards: Array<InfoCard|SwipeCard>): SwipeCard[] {
    return cards.filter(card => card.type == CardType.Swipe).map(card => <SwipeCard> card);
  }

  getInfoCards(cards: Array<InfoCard|SwipeCard>): InfoCard[] {
    return cards.filter(card => card.type == CardType.Info).map(card => <InfoCard> card);
  }

  getStars(cards: Array<InfoCard|SwipeCard>) {
    return cards.filter(card => card.isStar);
  }

  getNoArchive(cards: Array<InfoCard|SwipeCard>) {
    return cards.filter(card => !card.isArchive);
  }

  getArchives(cards: Array<InfoCard|SwipeCard>) {
    return cards.filter(card => card.isArchive);
  }

  getCurrentCard(): Observable<InfoCard|SwipeCard> {
    return this.cards.map(cards => cards.filter(card => card.isActive)[0]);
  }

  // Takes an array of cards and returns an array of rows (a row is an array of 2 cards)
  putCardsInRows(cards: Array<InfoCard|SwipeCard>) {
    let rows: Array<InfoCard|SwipeCard>[] = [];
    for (let i=0; i<cards.length-1; i+=2) {
      rows.push([cards[i],cards[i+1]]);
    }
    if (cards.length==1) {
      rows.push([cards[0]]);
    }
    else if (cards.length%2!=0) {
      rows.push([cards[cards.length-1]]);
    }
    return rows;
  }
}

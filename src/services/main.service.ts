import {Injectable} from "@angular/core";
import {Jsonp, Http} from '@angular/http';
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
  electionNameSpace = "election-presidentielle-2017";
  election: Observable<Election>;
  nav: Observable<NavController>;
  cards: Observable<Array<InfoCard|SwipeCard>>;
  infoUrl: Observable<Array<string>>;
  isHTML: Observable<boolean>;
  answers: Observable<Array<Answer>>;

  constructor(private jsonp: Jsonp, public http: Http, private store: Store<AppStore>) {
    this.election = store.select('election');
    this.nav = store.select('nav');
    this.cards = store.select('cards');
    this.infoUrl = store.select('infoUrl');
    this.isHTML = store.select('isHTML');
    this.answers = store.select('answers');
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
    }
  }

  getElectionViaVoxe(): Observable<Election> {
    return this.jsonp.get(this.server+'elections/search'+this.callback)
      .map(data => data.json().response.elections)
      .map(elections => elections.filter(election => {
        return election.namespace == this.electionNameSpace
      })[0]);
  }

  getElectionViaHttp(): Observable<Election> {
    return this.http.get(this.server+'elections/search')
      .map(data => data.json().response.elections)
      .map(elections => elections.filter(election => election.namespace == this.electionNameSpace)[0]);
  }

  // Helper which returns true if the 2 arrays have a common element
  hasCommonElement(arr1: Array<any>, arr2: Array<any>): boolean {
    for(var i=0; i<arr1.length; i++) {
      for(var j=0; j<arr2.length; j++) {
        if(arr1[i] == arr2[j]) {
          return true;
        }
      }
    }
    return false;
  }

  // Helper which transforms an array of observables in an observable of an array
  arrObs2ObsArr(arrObs: Array<Observable<any>>): Observable<Array<any>> {
    return Observable.from(arrObs).flatMap(x => x);
  }

  // Helper which returns an array of the propositions with one of the tags
  filterPropositionsByTagIds(propositions: Proposition[], tagIds: string[]) {
    return propositions.filter(proposition => {
      let tIds = proposition.tags.map(tag => tag.id);
      return this.hasCommonElement(tIds, tagIds);
    });
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

  // TODO: Get from API on App initialization
  // Presidential election 2017
  hamonId = "58b69f469f3f14a49f000022";
  macronId = "58b46bf8b7286ef02e00009f";
  asselineauId = "58c92078d3b212636d0000c8";
  fillonId = "58c920ded3b2120d5d0000cd";
  cheminadeId = "58c153f1b19d2f2cd5000084";
  lassalleId = "58c12c21b19d2f7930000050";
  melenchonId = "58b69cda9f3f14497500001e";
  lePenId = "58b69f3e9f3f14039a000021";
  arthaudId = "58c91f8ad3b21298910000be";
  dupontAignanId = "58c91ff4d3b212f0fa0000c3";
  poutouId = "58cec5c5d87ba3f5900002ba";

  cultureId = "4ef479f8bc60fb000400002a";
  institutionsId = "4ef479fbbc60fb000400015e";
  environnementId = "4ef479fabc60fb00040000ec";
  internationalId = "5785055285b1a8303e000098";
  societeId = "5141d25b6270dde92a0000c2";
  santeId = "4ef479fcbc60fb00040001c8";
  justiceId = "4ef479f9bc60fb00040000cc";
  europeId = "4ef479fcbc60fb0004000204";
  economieId = "4ef479f9bc60fb00040000aa";
  territoiresId = "4ef479fbbc60fb00040001b4";
  immigrationId = "4ef479fabc60fb0004000138";
  educationId = "4ef479f9bc60fb0004000052";
  emploiId = "4ef479f9bc60fb000400009a";

  // Used to generate random quizz
  temp_candidacyIds = [this.hamonId, this.macronId, this.asselineauId,
    this.fillonId, this.cheminadeId, this.lassalleId, this.melenchonId,
    this.lePenId, this.arthaudId, this.dupontAignanId, this.poutouId];
  temp_tagIds = [this.emploiId, this.economieId, this.institutionsId, this.europeId, this.educationId,
    this.cultureId, this.environnementId, this.justiceId, this.internationalId, this.societeId,
    this.santeId, this.territoiresId, this.immigrationId];

}

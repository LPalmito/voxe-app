import {Injectable} from "@angular/core";
import {Http} from '@angular/http';
import {Observable} from "rxjs";
import 'rxjs/Rx';
import {Store} from "@ngrx/store";
import {AppStore} from "../store";
import {NavController} from "ionic-angular";
import {SET_ELECTION} from "../reducers/election.reducer";
import {Card, InfoCard, SwipeCard, CardType} from "../pages/home/home";

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
  // TODO: Add a back-office to allow Voxe to change those 2 parameters?
  server = "http://compare.voxe.org/api/v1/";
  electionNameSpace = "primaire-de-la-droite-2016";
  election: Observable<Election>;
  nav: Observable<NavController>;

  constructor(private http: Http, private store: Store<AppStore>) {
    this.cards = this.store.select('cards');
    this.infoUrl = this.store.select('infoUrl');
  }

  initParams() {
    this.store.dispatch({type: SET_SERVER, payload: "http://compare.voxe.org/api/v1/"});
    this.store.dispatch({type: SET_ELECTION_NAME_SPACE, payload: "primaire-de-la-droite-2016"});
    this.nav = this.store.select('nav');
  }

  getElection(): Observable<Election> {
    return this.http.get(this.server+'elections/search')
      .map(data => data.json().response.elections)
      .map(elections => elections.filter(election => election.namespace == this.electionNameSpace)[0])
      .map(election => {
        this.store.dispatch({type: SET_ELECTION, payload: election});
        return election;
      });
  }

  arrObs2ObsArr(arrObs: Array<Observable<any>>): Observable<Array<any>> {
    return Observable.from(arrObs).flatMap(x => x);
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

  // Takes an array of cards and returns an array of rows (a row is an array of 2 cards)
  putCardsInRows(cards: Array<InfoCard|SwipeCard>) {
    var rows: Array<InfoCard|SwipeCard>[] = [];
    for (var i=0 ; i<cards.length-1 ; i=i+2) {
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


  // SALE HARD CODAGE TEMPORAIRE
  francoisFillonId = "578f480ab0bba9398100000b";
  alainJuppeId = "57962957793b3f868d000012";
  emploiId = "4ef479f9bc60fb000400009a";
  economieId = "4ef479f9bc60fb00040000aa";
  financeId = "4ef479f9bc60fb00040000be";
  europeId = "4ef479fcbc60fb0004000204";
  educationId = "4ef479f9bc60fb0004000052";
  cultureId = "578504e585b1a8f7f6000094";
  numeriqueId = "4ef479f8bc60fb000400002c";
  justiceId = "4ef479f9bc60fb00040000cc";

}

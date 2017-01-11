import {Injectable} from "@angular/core";
import {Http} from '@angular/http';
import {Observable} from "rxjs";
import 'rxjs/Rx';
import {Store} from "@ngrx/store";
import {AppStore} from "../store";
import {NavController} from "ionic-angular";
import {SET_SERVER} from "../reducers/server.reducer";
import {SET_ELECTION_NAME_SPACE} from "../reducers/election-name-space.reducer";

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
  nav: Observable<NavController>;
  server: Observable<string>;
  electionNameSpace: Observable<string>;
  ser: string;
  electNameSpace: string;

  constructor(private http: Http, private store: Store<AppStore>) {
  }

  initParams() {
    this.store.dispatch({type: SET_SERVER, payload: "http://compare.voxe.org/api/v1/"});
    this.store.dispatch({type: SET_ELECTION_NAME_SPACE, payload: "primaire-de-la-droite-2016"});
    this.nav = this.store.select('nav');
    this.server = this.store.select('server');
    this.electionNameSpace = this.store.select('electionNameSpace');
    this.server.subscribe(x => this.ser = x);
    this.electionNameSpace.subscribe(x => this.electNameSpace = x);
  }

  getElection(): Observable<Election> {
    return this.http.get(this.ser+'elections/search')
      .map(data => data.json().response.elections)
      .map(elections => elections.filter(election => election.namespace == this.electionNameSpace)[0]);
  }

  arrObs2ObsArr(arrObs: Array<Observable<any>>): Observable<Array<any>> {
    return Observable.from(arrObs).flatMap(x => x);
  }

}

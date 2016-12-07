import {Injectable} from "@angular/core";
import {Http} from '@angular/http';
import {Observable} from "rxjs";
import 'rxjs/Rx';

const server: string = "http://compare.voxe.org/api/v1/";
const electionNameSpace: string = "primaire-de-la-droite-2016";

export interface DataElections {
  meta: {code: number},
  response: {elections: Election[]}
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
  // TODO
}

@Injectable()
export class MainService {

  constructor(private http: Http) {}

  getElection(): Observable<Election> {
    return this.http.get(server+'elections/search')
      .map(data => data.json().response.elections)
      .map(elections => elections.filter(election => election.namespace == electionNameSpace)[0]);
  }

}

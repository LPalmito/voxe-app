import {Injectable} from "@angular/core";
import {Http} from '@angular/http';
import {Observable} from "rxjs";
import 'rxjs/Rx';
import {MainService, Proposition} from "./main.service";

@Injectable()
export class PropositionService {

  constructor(private http: Http, private main: MainService) {}

  getPropositions(): Observable<Array<Proposition>> {
    return this.http.get(this.main.server+'propositions/search')
      .map(data => data.json().response.propositions);
  }

  getPropositionById(propositionId: string): Observable<Proposition> {
    return this.getPropositions()
      .map(arr => arr.filter(x => x.id == propositionId)[0]);
  }

  getPropositionsForCandidacy(candidacyId: string): Observable<Array<Proposition>> {
    return this.getPropositions()
      .map(arr => arr.filter(x => x.candidacy.id == candidacyId));
  }

  // getPropositionsForTag(tagId: string): Observable<Array<Proposition>> {
  //   return this.getPropositions()
  //     .map(arr => arr.filter())
  // }

}

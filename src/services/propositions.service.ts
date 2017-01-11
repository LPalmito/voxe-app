import {Injectable} from "@angular/core";
import {Http} from '@angular/http';
import {Observable} from "rxjs";
import 'rxjs/Rx';
import {MainService, Proposition} from "./main.service";

@Injectable()
export class PropositionService {

  constructor(private http: Http, private main: MainService) {}

  getPropositions(): Observable<Array<Proposition>> {
    return this.http.get(this.main.ser+'propositions/search')
      .map(data => data.json().response.propositions);
  }

  getPropositionById(propositionId: string): Observable<Proposition> {
    return this.getPropositions()
      .map(arr => arr.filter(x => x.id == propositionId)[0]);
  }

  getPropositionsForCandidacies(candidacyIds: string[]): Observable<Array<Proposition>> {
    let url = this.main.ser+'propositions/search?candidacyIds=';
    candidacyIds.forEach(x => url += x+",");
    return this.http.get(url)
      .map(data => data.json().response.propositions)
      .map(arr => arr.filter(x => candidacyIds.indexOf(x.candidacy.id)>=0));
  }

  getPropositionsForTags(tagIds: string[]): Observable<Array<Proposition>> {
    let url = this.main.ser+'propositions/search?tagIds=';
    tagIds.forEach(x => url += x+",");
    return this.http.get(url)
      .map(data => data.json().response.propositions)
      .map(arr => arr.filter(x => {
          let tIds = x.tags.map(tag => tag.id);
          let isKept = false;
          tIds.forEach(tId => tagIds.forEach(tagId => {
            if(tId == tagId) {
              isKept = true;
            };
          }));
          return isKept;
      }));
  }

  getPropositionForSwipe(candidacyIds: string[], tagIds: string[]): Observable<Array<Proposition>> {
    return this.getPropositionsForTags(tagIds)
      .map(arr => arr.filter(x => candidacyIds.indexOf(x.candidacy.id)>=0));
  }

}

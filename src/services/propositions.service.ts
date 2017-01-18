import {Injectable} from "@angular/core";
import {Http} from '@angular/http';
import {Observable} from "rxjs";
import 'rxjs/Rx';
import {MainService, Proposition} from "./main.service";
import {AppStore} from "../store";
import {Store} from "@ngrx/store";
import {SET_PROPOSITIONS} from "../reducers/propositions.reducer";

@Injectable()
export class PropositionService {
  propositions: Observable<Array<Proposition>>;

  constructor(private http: Http, private main: MainService, private store: Store<AppStore>) {
    this.propositions = store.select('propositions');
  }

  getPropositionsForElection(): Observable<Array<Proposition>> {
    return this.main.election
      .map(election => election.tags)
      .map(tags => tags.map(tag => tag.id))
      .flatMap(tagIds => this.getPropositionsForTagsViaVoxe(tagIds))
      .map(propositions => this.store.dispatch({type: SET_PROPOSITIONS, payload: propositions}));
  }

  getPropositionById(propositionId: string): Observable<Proposition> {
    return this.propositions
      .map(arr => arr.filter(x => x.id == propositionId)[0]);
  }

  getPropositionsForCandidacies(candidacyIds: string[]): Observable<Array<Proposition>> {
    return this.propositions
      .map(arr => arr.filter(x => candidacyIds.indexOf(x.candidacy.id)>=0));
  }

  getPropositionsForTags(tagIds: string[]): Observable<Array<Proposition>> {
    return this.propositions
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

  // Unused: Get the propositions according to a search by candidacy ids in Voxe API
  getPropositionsForCandidaciesViaVoxe(candidacyIds: string[]): Observable<Array<Proposition>> {
    let url = this.main.server+'propositions/search?candidacyIds=';
    candidacyIds.forEach(x => url += x+",");
    return this.http.get(url)
      .map(data => data.json().response.toSwipePropositions)
      .map(arr => arr.filter(x => candidacyIds.indexOf(x.candidacy.id)>=0));
  }

  // Unused : Get the propositions according to a search by tag ids in Voxe API
  getPropositionsForTagsViaVoxe(tagIds: string[]): Observable<Array<Proposition>> {
    let url = this.main.server+'propositions/search?tagIds=';
    tagIds.forEach(x => url += x+",");
    return this.http.get(url)
      .map(data => data.json().response.toSwipePropositions)
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

}

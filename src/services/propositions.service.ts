import {Injectable} from "@angular/core";
import {Http} from '@angular/http';
import {Observable} from "rxjs";
import 'rxjs/Rx';
import {MainService, Proposition} from "./main.service";
import {AppStore} from "../store";
import {Store} from "@ngrx/store";
import {Answer} from "../pages/swipe/swipe";

@Injectable()
export class PropositionService {
  propositions: Observable<Array<Proposition>>;
  toSwipePropositions: Observable<Array<Proposition>>;
  swipedPropositions: Observable<Array<Proposition>>;
  answers: Observable<Array<Answer>>;

  constructor(private http: Http, private main: MainService, private store: Store<AppStore>) {
    this.propositions = store.select('propositions');
    this.toSwipePropositions = store.select('toSwipePropositions');
    this.swipedPropositions = store.select('swipedPropositions');
    this.answers = store.select('answers');
  }

  getPropositionsForElection(): Observable<Array<Proposition>> {
    return this.main.election.map(election => election == undefined ? [] : election.tags)
      .map(tags => tags.map(tag => tag.id))
      .flatMap(tagIds => tagIds.length == 0 ? Observable.from([]) : this.getPropositionsForTags(tagIds));
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
    return this.propositions.flatMap(propositions => {

      // If propositions are already in the store, filter it into nestedPropositions and return an observable of it
      if(propositions.length != 0) {
        let nestedPropositions = propositions.filter(proposition => {
          let tIds = proposition.tags.map(tag => tag.id);
          return this.main.hasCommonElement(tIds, tagIds);
        });

        return Observable.from([nestedPropositions]);
      }

      // If we need to get them from Voxe
      else {
        return this.getPropositionsForTagsViaVoxe(tagIds)
          .map(nestedNewPropositions => {
            return nestedNewPropositions.filter(nestedNewProposition => {
              let tIds = nestedNewProposition.tags.map(tag => tag.id);
              return this.main.hasCommonElement(tIds, tagIds);
            });
          })
          .first();
      }

    }).first();
  }

  getPropositionsForSwipe(candidacyIds: string[], tagIds: string[]): Observable<Array<Proposition>> {
    let result = this.getPropositionsForTags(tagIds)
      .map(arr => arr.filter(x => candidacyIds.indexOf(x.candidacy.id)>=0));
    result.subscribe(x => console.log("getPropositionsForSwipe: ", x));
    return result;
  }

  // Unused at the moment
  // Get the propositions according to a search by candidacy ids in Voxe API
  getPropositionsForCandidaciesViaVoxe(candidacyIds: string[]): Observable<Array<Proposition>> {
    let url = this.main.server+'propositions/search?candidacyIds=';
    candidacyIds.forEach(x => url += x+",");
    return this.http.get(url)
      .map(data => data.json().response.propositions)
      .map(arr => arr.filter(x => candidacyIds.indexOf(x.candidacy.id)>=0));
  }

  // TODO: Find a quicker way to set the propositions
  // Get the propositions according to a search by tag ids in Voxe API
  getPropositionsForTagsViaVoxe(tagIds: string[], previousPropositions: Proposition[] = [], offset: number = 0): Observable<Array<Proposition>> {

    // Prepare the url
    let url = this.main.server+'propositions/search?tagIds=';
    tagIds.forEach(x => url += x+",");
    url = url.slice(0,-1)+'&offset='+offset.toString();

    // Do the request and filter the response
    return this.http.get(url)
      .map(data => data.json().response.propositions)
      .flatMap(propositions => {
        let currentPropositions = previousPropositions.concat(propositions);
        return propositions.length < 500 ?
          Observable.from([currentPropositions]):
          this.getPropositionsForTagsViaVoxe(tagIds, currentPropositions, offset+500);
      });

  // For tests purpose:
  // http://compare.voxe.org/api/v1/propositions/search?tagIds=4ef479fcbc60fb000400022c,4ef479fcbc60fb0004000222&offset=1&limit=3
  }

}

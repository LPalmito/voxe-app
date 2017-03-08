import {Injectable} from "@angular/core";
import {Jsonp} from '@angular/http';
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

  constructor(private jsonp: Jsonp, private main: MainService, private store: Store<AppStore>) {
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
      let arePropositionsAlreadyInStore = this.main.filterPropositionsByTagIds(propositions, tagIds).length != 0;

      // If propositions are already in the store, filter it into nestedPropositions and return an observable of it
      if(arePropositionsAlreadyInStore) {
        let nestedPropositions = this.main.filterPropositionsByTagIds(propositions, tagIds);
        return Observable.from([nestedPropositions]);
      }

      // If we need to get them from Voxe
      else {
        return this.getPropositionsForTagsViaVoxe(tagIds)
          .map(nestedNewPropositions => {
            return this.main.filterPropositionsByTagIds(nestedNewPropositions, tagIds);
          }).first();
      }

    }).first();
  }

  getPropositionsForSwipe(candidacyIds: string[], tagIds: string[]): Observable<Array<Proposition>> {
    return this.getPropositionsForTags(tagIds)
      .map(arr => {
        let nb = 5;
        let resultArray: Proposition[] = [];
        for (let i=0 ; i<candidacyIds.length ; i++) {
          let candidacyArray = this.randomDiffElement(arr.filter(x => x.candidacy != undefined ? x.candidacy.id == candidacyIds[i] : false),nb);
          resultArray = resultArray.concat(candidacyArray);
        }
        return this.randomDiffElement(resultArray,candidacyIds.length*nb);
      });
  }

  //Helper : takes an array of propositions and returns an array of X random different elements
  randomDiffElement(array: Proposition[], nb: number): Proposition[] {
    let result: Proposition[] = [];
    while (result.length < nb) {
      let randomElement: Proposition = array[Math.floor(Math.random()*array.length)];
      if (result.indexOf(randomElement) < 0) {
        result.push(randomElement);
      }
    }
    return result;
  }

  // Unused at the moment
  // Get the propositions according to a search by candidacy ids in Voxe API
  getPropositionsForCandidaciesViaVoxe(candidacyIds: string[]): Observable<Array<Proposition>> {
    let url = this.main.server+'propositions/search'+this.main.callback+'&candidacyIds=';
    candidacyIds.forEach(x => url += x+",");
    return this.jsonp.get(url)
      .map(data => data.json().response.propositions)
      .map(arr => arr.filter(x => candidacyIds.indexOf(x.candidacy.id)>=0));
  }

  // TODO: Find a quicker way to set the propositions
  // Get the propositions according to a search by tag ids in Voxe API
  getPropositionsForTagsViaVoxe(tagIds: string[], previousPropositions: Proposition[] = [], offset: number = 0): Observable<Array<Proposition>> {

    // Prepare the url
    let url = this.main.server+'propositions/search'+this.main.callback+'&tagIds=';
    tagIds.forEach(x => url += x+",");
    url = url.slice(0,-1)+'&offset='+offset.toString();

    // Do the request and filter the response
    return this.jsonp.get(url)
      .map(data => data.json().response.propositions)
      .flatMap(propositions => {
        let currentPropositions = previousPropositions.concat(propositions);
        return propositions.length < 500 ?
          Observable.from([currentPropositions]):
          this.getPropositionsForTagsViaVoxe(tagIds, currentPropositions, offset+500);
      });

  }

}

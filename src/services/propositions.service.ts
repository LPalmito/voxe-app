import {Injectable} from "@angular/core";
import {Jsonp} from '@angular/http';
import {Observable} from "rxjs";
import 'rxjs/Rx';
import {MainService, Proposition} from "./main.service";
import {AppStore} from "../store";
import {Store} from "@ngrx/store";
import {Answer} from "../pages/swipe/swipe";
import {ADD_PROPOSITIONS} from "../reducers/propositions.reducer";


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

  getPropositionsForSwipe(candidacyIds: string[], tagIds: string[], nb: number): Observable<Array<Proposition>> {
    let arrObs = candidacyIds
      .map(id => this.getPropositions(id,tagIds[0],nb)
        .map(arr => this.randomDiffElement(arr,nb))); // [Obs<Prop[]>,Obs<Prop[]>]
    return arrObs[0].combineLatest(arrObs[1], (arrProp0,arrProp1) => arrProp0.concat(arrProp1))
      .map(arr => this.randomDiffElement(arr,arr.length));
  }

  getPropositions(candidacyId: string, tagId: string, nb: number): Observable<Array<Proposition>> {
    return this.propositions
      .map(arr => arr.filter(proposition => proposition.tags[0].id == tagId))
      .map(arr => arr.filter(proposition => proposition.candidacy.id == candidacyId))
      .flatMap(arr => arr.length >= nb ?
        Observable.from([arr]):
        this.getPropositionsViaVoxe(candidacyId, tagId, [], 0)
          .map(voxe => voxe.filter(proposition => arr.map(p => p.id).indexOf(proposition.id) == -1))
          .map(voxe => {
            this.store.dispatch({type: ADD_PROPOSITIONS, payload: voxe});
            return arr.concat(voxe);
          })
      )
  }

  getPropositionsViaVoxe(candidacyId: string,
                         tagId: string,
                         previousPropositions: Proposition[] = [],
                         offset: number = 0): Observable<Array<Proposition>> {

    // Prepare the url
    let url = this.main.server+'propositions/search'+this.main.callback+'&tagIds='+tagId+'&candidacyIds='+candidacyId;

    // Do the request and filter the response
    return this.jsonp.get(url)
      .map(data => data.json().response.propositions)
      .map(propositions => {
        let currentPropositions = previousPropositions.concat(propositions);
        return propositions.length < 500 ?
          currentPropositions :
          this.getPropositionsViaVoxe(candidacyId, tagId, currentPropositions, offset + 500);
      });
  }

  //Helper : takes an array of propositions and returns an array of 'nb' random different elements
  randomDiffElement(array: Proposition[], nb: number): Proposition[] {
    let result: Proposition[] = [];
    if (array.length >= nb) {
      for (let i = 0; i < nb; i++) {
        let randomElement: Proposition = array[Math.floor(Math.random() * array.length)];
        while (result.indexOf(randomElement) > -1) {
          randomElement = array[Math.floor(Math.random() * array.length)];
        }
        result.push(randomElement);
      }
    }
    else {
      return this.randomDiffElement(array, array.length);
    }
    return result;
  }

  // getPropositionsForElection(): Observable<Array<Proposition>> {
  //   return this.main.election.map(election => election == undefined ? [] : election.tags)
  //     .map(tags => tags.map(tag => tag.id))
  //     .flatMap(tagIds => tagIds.length == 0 ? Observable.from([]) : this.getPropositionsForTags(tagIds));
  // }

}

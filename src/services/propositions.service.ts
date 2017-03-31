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

  // Charge les propositions des candidats pour ce tag, et renvoie un array de la bonne forme pour le Swipe
  getPropositionsForSwipe(candidacyIds: string[], tagIds: string[], nb: number): Observable<Array<Proposition>> {
    let arrObs = this.loadPropositionsForSwipe(candidacyIds,tagIds,nb); // [Obs<Prop[]>,Obs<Prop[]>]
    let randomArrObs = arrObs.map(obs => obs.map(arr => this.randomDiffElement(arr,nb)));
    return randomArrObs[0].combineLatest(randomArrObs[1], (arrProp0,arrProp1) => arrProp0.concat(arrProp1))
      .map(arr => this.randomDiffElement(arr,arr.length));
  }

  // Charge dans le Store les propositions des candidats pour ce tag, si elles n'y sont pas encore
  loadPropositionsForSwipe(candidacyIds: string[], tagIds: string[], nb: number): Array<Observable<Proposition[]>> {
    let tagProp = this.getLocalPropositionsByTag(tagIds[0]);
    let arrObs = candidacyIds
      .map(id => this.getPropositionsByCandidacy(id,tagIds[0],tagProp,nb));
    return arrObs;
  }

  // Retourne les propositions du Store correspondant au tag
  getLocalPropositionsByTag(tagId: string): Observable<Array<Proposition>> {
    return this.propositions
      .map(arr => arr
        .filter(proposition => proposition.tags.map(t => t.id).indexOf(tagId) > -1));
  }

  // Retourne les propositions du Store correspondant au candidat et au tag
  // S'il n'y en a pas assez, appelle l'API et enregistre au passage les propositions dans le Store
  getPropositionsByCandidacy(candidacyId: string, tagId: string, tagProp: Observable<Proposition[]>, nb: number): Observable<Array<Proposition>> {
    return tagProp
      .map(arr => arr.filter(proposition => proposition.candidacy.id == candidacyId))
      .flatMap(arr => arr.length >= nb ?
          Observable.from([arr]):
          this.getPropositionsViaVoxe(candidacyId, tagId, [], 0)
            .map(voxe => voxe.filter(proposition => arr.map(p => p.id).indexOf(proposition.id) == -1))
            .map(voxe => {
              this.store.dispatch({type: ADD_PROPOSITIONS, payload: voxe}); // A remplacer par ADD_NEW_PROPOSITIONS ?
              return arr.concat(voxe);
            })
      ).first();
  }

  // Appelle l'API
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
          this.getPropositionsViaVoxe(candidacyId, tagId, currentPropositions, offset+500);
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
}

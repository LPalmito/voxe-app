import {Injectable} from "@angular/core";
import {Http} from '@angular/http';
import {Observable} from "rxjs";
import 'rxjs/Rx';
import {MainService, Proposition} from "./main.service";
import {AppStore} from "../store";
import {Store} from "@ngrx/store";
import {SET_PROPOSITIONS} from "../reducers/propositions.reducer";
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

  // NE RETOURNE QUE 500 PROPOSITIONS
  getPropositionsForElection(): Observable<Array<Proposition>> {
    this.main.election.subscribe(x => console.log("main.election:"+x));
    return this.main.election
      .map(election => {
        console.log("election:"+election);
        return election != undefined ? election.tags : [];
      })
      .map(tags => {
        console.log("tags:"+tags);
        return tags.map(tag => {
          console.log("tag:"+tag);
          return tag.id;
          });
      })
      .flatMap(tagIds => {
        console.log("tagIds:"+tagIds);
        return tagIds.length != 0 ? this.getPropositionsForTagsViaVoxe(tagIds) : Observable.from([[]]);
      });
  }

  getPropositionById(propositionId: string): Observable<Proposition> {
    return this.propositions
      .map(arr => arr.filter(x => x.id == propositionId)[0]);
  }

  getPropositionsForCandidacies(candidacyIds: string[]): Observable<Array<Proposition>> {
    return this.propositions
      .map(arr => arr.filter(x => candidacyIds.indexOf(x.candidacy.id)>=0));
  }


  //NE RETOURNE QU'UN ARRAY DE 15 PROPOSITIONS : alors qu'il y en a + de 15 sur le comparateur rien qu'avec FF et AJ
  getPropositionsForTags(tagIds: string[]): Observable<Array<Proposition>> {
    this.propositions.subscribe(x => console.log("this.propositions:"+x));
    let result = this.propositions
      .map(arr => arr.filter(x => {
        let tIds = x.tags.map(tag => tag.id);
        return this.main.hasCommonElement(tIds, tagIds);
      }))
      .first();
    result.subscribe(x => console.log("getPropositionsForTags: ", x));
    return result;
  }

  getPropositionsForSwipe(candidacyIds: string[], tagIds: string[]): Observable<Array<Proposition>> {
    let result = this.getPropositionsForTags(tagIds)
      .map(arr => arr.filter(x => candidacyIds.indexOf(x.candidacy.id)>=0));
    result.subscribe(x => console.log("getPropositionsForSwipe: ", x));
    return result;
  }

  // Get the propositions according to a search by candidacy ids in Voxe API
  getPropositionsForCandidaciesViaVoxe(candidacyIds: string[]): Observable<Array<Proposition>> {
    let url = this.main.server+'propositions/search?candidacyIds=';
    candidacyIds.forEach(x => url += x+",");
    return this.http.get(url)
      .map(data => data.json().response.propositions)
      .map(arr => arr.filter(x => candidacyIds.indexOf(x.candidacy.id)>=0));
  }

  // NE RETOURNE QUE 500 PROPOSITIONS
  // TODO: Think about another way to add the propositions than all at the same time
  // Get the propositions according to a search by tag ids in Voxe API
  getPropositionsForTagsViaVoxe(tagIds: string[]): Observable<Array<Proposition>> {

    var url = this.main.server+'propositions/search?tagIds=';
    tagIds.forEach(x => url += x+",");
    console.log(url);
    url += "&offset=";

    var results: Array<Proposition> = []; 

    var offset = 0;
    var arrlength = 500;

    while (arrlength == 500) {
        
      let result = this.http.get(url+offset)
        .map(data => data.json().response.propositions);

      result.subscribe(x => console.log("getPropositionsForTagsViaVoxe: "+x));

      result.subscribe(arr => arrlength = arr.length);
      offset++;
      console.log("arrlength: "+arrlength);
      console.log("offset: "+offset);

      result.subscribe(x => results.concat(x));
      console.log(results.length);

    }

    return Observable.from([results]);
  }
}

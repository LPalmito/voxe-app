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
        // console.log("tags:"+tags);
        return tags.map(tag => {
          // console.log("tag:"+tag);
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
  getPropositionsForTagsViaVoxe(tagIds: string[], previousResults: Proposition[] = [], offset: number = 0): Observable<Array<Proposition>> {

    // J'ai découpé chaque étape pour pouvoir console.logger
    var url = this.main.server+'propositions/search?tagIds=';
    tagIds.forEach(x => url += x+",");
    console.log("forEach tagId: "+url);

    var sliceUrl = url.slice(0,-1)+'&offset=';
    console.log("sliceUrl: "+sliceUrl);
    
    var offsetToString = offset.toString();
    console.log("offsetToString: "+offsetToString);
    
    var offsetUrl = sliceUrl+offsetToString;
    console.log("offsetUrl: "+offsetUrl);

    var results: Array<Proposition> = [];
    var arrlength: number = 0;

    // Le vrai 'result' qu'on devrait utiliser est offsetResult
    // Les autres sont là pour le test, pour voir s'il y a un problème dans l'URL
    var result = this.http.get(url)
      .map(data => data.json().response.propositions);
    var sliceResult = this.http.get(sliceUrl)
      .map(data => data.json().response.propositions);
    var offsetResult = this.http.get(offsetUrl)
      .map(data => data.json().response.propositions);

    // Aucune des 3 subscriptions ci-dessous n'affiche quoi que ce soit dans la console.
    result.subscribe(arr => {
      console.log(arr);
      results = previousResults.concat(arr);
      arrlength = arr.length;
    });

    sliceResult.subscribe(arr => console.log(arr));
    offsetResult.subscribe(arr => console.log(arr));

    while(results.length == 0) {
      setTimeout(function() {}, 1000);
    }

    if(arrlength == 500) {
      return this.getPropositionsForTagsViaVoxe(tagIds, results, offset+1);
    }
    else {
      return Observable.from([results]);
    }

    // Cette version sortait une erreur car la fonction n'avait pas de 'return' apparent (il était dans la boucle if/else)
    // var results: Array<Proposition> = [];
    // var offset: Observable<number> = Observable.from([0]);
    // var result: Observable<Array<Proposition>> = Observable.from([[]]);

    // offset.subscribe(nb => {
    //   result = this.http.get(url+nb.toString())
    //     .map(data => data.json().response.propositions);

    //   result.subscribe(arr => {
    //     results = results.concat(arr);
    //     console.log("results.length: "+results.length);
        
    //     if(arr.length == 500) {
    //       offset = Observable.from([nb+1]);
    //     }

    //     else {
    //       return Observable.from([results]);
    //     }
    //   });
    // });
  }
}
import {Injectable} from "@angular/core";
import {Observable} from "rxjs";
import 'rxjs/Rx';
import {MainService, Candidate} from "./main.service";
import {AppStore} from "../store";
import {Store} from "@ngrx/store";

@Injectable()
export class CandidateService {
  candidates: Observable<Array<Candidate>>;

  constructor(private main: MainService, private store: Store<AppStore>) {
    this.candidates = store.select('candidates');
  }

  getCandidates(): Observable<Array<Candidate>> {
    let candidates = this.candidates.flatMap(storeCandidates => {
      if(storeCandidates != undefined) {
        return this.candidates
      }
      else {
        return this.main.getElection()
          .map(election => election.candidacies)
          .map(candidacies => candidacies.map(candidacy => candidacy.candidates[0]));
      }
    });
    candidates.subscribe(x => console.log("candidates: ", x));
    return candidates
  }

  getCandidateById(candidateId: string): Observable<Candidate> {
    return this.getCandidates()
      .map(candidates => candidates.filter(candidate => candidate.id == candidateId)[0])
  }

  getCandidateByNameSpace(nameSpace: string): Observable<Candidate> {
    return this.getCandidates()
      .map(candidates => candidates.filter(candidate => candidate.namespace == nameSpace)[0])
  }

}

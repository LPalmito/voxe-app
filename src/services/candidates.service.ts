import {Injectable} from "@angular/core";
import {Observable} from "rxjs";
import 'rxjs/Rx';
import {MainService, Candidate} from "./main.service";
import {AppStore} from "../store";
import {Store} from "@ngrx/store";
import {SET_CANDIDATES} from "../reducers/candidates.reducer";

@Injectable()
export class CandidateService {
  candidates: Observable<Array<Candidate>>;

  constructor(private main: MainService, private store: Store<AppStore>) {
    this.candidates = store.select('candidates');
  }

  getCandidates(): Observable<Array<Candidate>> {
    return this.candidates.flatMap(storeCandidates => {
      if(storeCandidates != undefined) {
        return this.candidates;
      }
      else {
        return this.main.getElection()
          .map(election => election.candidacies)
          .map(candidacies => candidacies.map(candidacy => candidacy.candidates[0]))
          .map(candidates => {
            this.store.dispatch({type: SET_CANDIDATES, payload: candidates});
            return candidates;
        });
      }
    });
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

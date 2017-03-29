import {Injectable} from "@angular/core";
import {Observable} from "rxjs";
import 'rxjs/Rx';
import {MainService, Candidate, Candidacy} from "./main.service";
import {AppStore} from "../store";
import {Store} from "@ngrx/store";

@Injectable()
export class CandidateService {
  candidacies: Observable<Array<Candidacy>>;
  candidates: Observable<Array<Candidate>>;
  candidacyIds: Observable<Array<string>>;

  constructor(private main: MainService, public store: Store<AppStore>) {
    this.candidacies = this.main.election.map(election => election != undefined ? election.candidacies : []);
    this.candidates = this.candidacies.map(candidacies => candidacies.length>0 ?
      candidacies.map(candidacy => candidacy.candidates[0]): []);
    this.candidacyIds = store.select('candidacyIds');
  }

  getCandidacyById(candidacyId: string): Observable<Candidacy> {
    return this.candidacies.map(candidacies => candidacies.filter(candidacy => candidacy.id == candidacyId)[0])
  }

  getCandidateById(candidateId: string): Observable<Candidate> {
    return this.candidates.map(candidates => candidates.filter(candidate => candidate.id == candidateId)[0])
  }

  getCandidacyByNameSpace(nameSpace: string): Observable<Candidacy> {
    return this.candidacies.map(candidates => candidates.filter(candidate => candidate.namespace == nameSpace)[0])
  }

  getCandidateByNameSpace(nameSpace: string): Observable<Candidate> {
    return this.candidates.map(candidates => candidates.filter(candidate => candidate.namespace == nameSpace)[0])
  }
}

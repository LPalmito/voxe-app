import {Injectable} from "@angular/core";
import {Observable} from "rxjs";
import 'rxjs/Rx';
import {MainService, Candidate, Candidacy} from "./main.service";

@Injectable()
export class CandidateService {
  candidacies: Observable<Array<Candidacy>>;
  candidates: Observable<Array<Candidate>>;

  constructor(private main: MainService) {
    this.candidacies = this.main.election
      .map(election => election.candidacies);
    this.candidates = this.candidacies
      .map(candidacies => candidacies.map(candidacy => candidacy.candidates[0]));
  }

  getCandidacies(): Observable<Array<Candidacy>> {
    return this.candidacies
  }

  getCandidates(): Observable<Array<Candidate>> {
    return this.candidates
  }

  getCandidacyById(candidacyId: string): Observable<Candidacy> {
    return this.candidacies
      .map(candidacies => candidacies.filter(candidacy => candidacy.id == candidacyId)[0])
  }

  getCandidateById(candidateId: string): Observable<Candidate> {
    return this.candidates
      .map(candidates => candidates.filter(candidate => candidate.id == candidateId)[0])
  }

  getCandidacyByNameSpace(nameSpace: string): Observable<Candidacy> {
    return this.candidacies
      .map(candidates => candidates.filter(candidate => candidate.namespace == nameSpace)[0])
  }

  getCandidateByNameSpace(nameSpace: string): Observable<Candidate> {
    return this.candidates
      .map(candidates => candidates.filter(candidate => candidate.namespace == nameSpace)[0])
  }

}

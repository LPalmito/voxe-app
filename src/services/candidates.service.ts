import {Injectable} from "@angular/core";
import {Http} from '@angular/http';
import {Observable} from "rxjs";
import 'rxjs/Rx';
import {MainService, Candidate} from "./main.service";

@Injectable()
export class CandidateService {

  constructor(private main: MainService) {}

  getCandidates(): Observable<Array<Candidate>> {
    return this.main.getElection()
      .map(election => election.candidacies)
      .map(candidacies => candidacies.map(candidacy => candidacy.candidates[0]));
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

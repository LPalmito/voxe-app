import {Injectable} from "@angular/core";
import {Observable} from "rxjs";
import 'rxjs/Rx';
import {MainService, Candidate, Candidacy} from "./main.service";
import {AppStore} from "../store";
import {Store} from "@ngrx/store";

@Injectable()
export class CandidateService {
  candidacies: Array<Candidacy>;
  candidates: Array<Candidate>;
  candidacyIds: Observable<Array<string>>;

  constructor(private main: MainService, public store: Store<AppStore>) {
    this.main.election.subscribe(election => {
      if (election != undefined) {
        this.candidacies = election.candidacies;
        this.candidates = this.candidacies.map(candidacy => candidacy.candidates[0]);
      }
    });
    this.candidacyIds = store.select('candidacyIds');
  }

  getCandidacyById(candidacyId: string): Candidacy {
    return this.candidacies.filter(candidacy => candidacy.id == candidacyId)[0];
  }

  getCandidateById(candidateId: string): Candidate {
    return this.candidates.filter(candidate => candidate.id == candidateId)[0];
  }

  getCandidacyByNameSpace(nameSpace: string): Candidacy {
    return this.candidacies.filter(candidacy => candidacy.namespace == nameSpace)[0];
  }

  getCandidateByNameSpace(nameSpace: string): Candidate {
    return this.candidates.filter(candidate => candidate.namespace == nameSpace)[0];
  }

}

import {Injectable} from "@angular/core";
import {Http} from '@angular/http';
import {Observable} from "rxjs";
import 'rxjs/Rx';
import {MainService, Proposition} from "./main.service";

@Injectable()
export class PropositionService {

  constructor(private http: Http, private main: MainService) {}

  // getPropositions(): Observable<Array<Proposition>> {
  //   // TODO
  // }
  //
  // getPropositionById(propositionId: string): Observable<Proposition> {
  //   // TODO
  // }
  //
  // getPropositionsForCandidate(candidateId: string): Observable<Array<Proposition>> {
  //   // TODO
  // }
  //
  // getPropositionsForTag(tagId: string): Observable<Array<Proposition>> {
  //   // TODO
  // }

}

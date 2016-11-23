import {Injectable} from "@angular/core";
import {Http} from '@angular/http';
import {Observable} from "rxjs";
import 'rxjs/Rx';

export interface Candidate {
  firstName: string,
  id: string,
  lastName: string,
  namespace: string,
  photo: {
    sizes: {
      large: {url: string},
      medium: {url: string},
      small: {url: string}
    }
  }
}

@Injectable()
export class CandidateService {
  server: string = "http://compare.voxe.org/api/v1/";

  constructor(private http: Http) {}

  getCandidateByNameSpace(nameSpace: string): Observable<Candidate> {
    return this.http.get(this.server+'candidates/search?name='+nameSpace)
      .map(data => data.json().response.candidates)
      .map(candidates => candidates.filter(candidate => candidate.namespace == nameSpace)[0]);
  }

}

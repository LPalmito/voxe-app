import {Injectable} from "@angular/core";
import {Http} from '@angular/http';
import {Observable} from "rxjs";
import 'rxjs/Rx';

export interface Proposition {
  // TODO
}

@Injectable()
export class PropositionService {
  server: string = "http://compare.voxe.org/api/v1/";

  constructor(private http: Http) {}

  getPropositionsFiltered(candidateIds: string[], tagIds: string[]): Observable<Array<Proposition>> {
    let url = this.server+'propositions/search';
    // Add the candidateIds to the URL
    url += '?candidacyIds=';
    candidateIds.forEach(x => url+=x+',');
    url = url.substring(0, url.length - 1);
    // Add the tagIds to the URL
    url += '?tagIds=';
    tagIds.forEach(x => url+=x+',');
    url = url.substring(0, url.length - 1);
    let test = this.http.get(url)
      .map(data => data.json());
    test.subscribe(x => console.log(x));
    return test;
  }

}

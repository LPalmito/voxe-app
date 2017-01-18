import {Injectable} from "@angular/core";
import {Observable} from "rxjs";
import 'rxjs/Rx';
import {MainService, Tag} from "./main.service";
import {AppStore} from "../store";
import {Store} from "@ngrx/store";

@Injectable()
export class TagService {
  tagIds: Observable<Array<string>>;

  constructor(private main: MainService, public store: Store<AppStore>) {
    this.tagIds = this.store.select('tagIds')
  }

  getTags(): Observable<Array<Tag>> {
    return this.main.getElectionViaVoxe()
      .map(election => election.tags)
  }

  getTagById(tagId: string): Observable<Tag> {
    return this.getTags()
      .map(arr => arr.filter(x => x.id == tagId)[0])
  }

  getTagByNameSpace(nameSpace: string): Observable<Tag> {
    return this.getTags()
      .map(arr => arr.filter(x => x.namespace == nameSpace)[0])
  }

}

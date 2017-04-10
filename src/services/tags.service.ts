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
    this.tagIds = this.store.select('tagIds');
  }

  getTagsForElection(): Observable<Array<Tag>> {
    return this.main.election.map(election => election != undefined ? election.tags : []);
  }

  getTagById(tagId: string): Observable<Tag> {
    return this.getTagsForElection()
      .map(arr => arr.filter(x => x.id == tagId)[0])
  }

  getTagByNameSpace(nameSpace: string): Observable<Tag> {
    return this.getTagsForElection()
      .map(arr => arr.filter(x => x.namespace == nameSpace)[0])
  }

  // Helper to get the url of a tag icon (for the size: 0 <=> 32, 1 <=> 64)
  getIcon(tag: Tag, size: number): string {
    return tag.icon.prefix + tag.icon.sizes[size] + tag.icon.name;
  }

}

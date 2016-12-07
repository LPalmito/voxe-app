import {Injectable} from "@angular/core";
import {Http} from '@angular/http';
import {Observable} from "rxjs";
import 'rxjs/Rx';
import {MainService, Tag} from "./main.service";

@Injectable()
export class TagService {

  constructor(private main: MainService) {}

  getTags(): Observable<Array<Tag>> {
    return this.main.getElection()
      .map(election => election.tags)
  }

  getTagById(tagId: string): Observable<Tag> {
    return this.getTags()
      .map(tags => tags.filter(tag => tag.id == tagId)[0])
  }

  getTagByNameSpace(nameSpace: string): Observable<Tag> {
    return this.getTags()
      .map(tags => tags.filter(tag => tag.namespace == nameSpace)[0])
  }

}

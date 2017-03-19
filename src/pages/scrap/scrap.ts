import {Component} from "@angular/core";
import {DomSanitizer, SafeResourceUrl} from '@angular/platform-browser';

@Component({
  templateUrl: 'scrap.html'
})

export class ScrapPage {
  scrap: SafeResourceUrl;

  constructor(public sanitizer: DomSanitizer) {
    this.scrap = this.sanitizer.bypassSecurityTrustResourceUrl("http://www.voxe.org/jean-luc-bennahmias/");
  }
}

import {Component} from "@angular/core";
import {DomSanitizer} from '@angular/platform-browser';
import {SafeUrl} from '@angular/platform-browser';

@Component({
  templateUrl: 'scrap.html'
})

export class ScrapPage {
  scrap: SafeUrl = this.sanitizer.bypassSecurityTrustUrl("http://www.voxe.org/jean-luc-bennahmias/");

  constructor(public sanitizer: DomSanitizer) {
  }
}

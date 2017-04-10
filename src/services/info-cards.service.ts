import {Injectable} from "@angular/core";
import {InfoCard, SwipeCard} from "../pages/home/home";
import {MainService} from "./main.service";
import {CandidateService} from "./candidates.service";
import {Observable} from "rxjs";
import {Http} from "@angular/http";

@Injectable()
export class InfoCardsService {

  alreadyInStoreInfoCards: Array<InfoCard> = [];
  areSwipeCardsEmpty: boolean = true;

  constructor(private main: MainService, private http: Http, private candidateService: CandidateService) {
    this.main.cards.subscribe(cards => {
      this.alreadyInStoreInfoCards = this.main.getInfoCards(cards);
      this.areSwipeCardsEmpty = !(this.main.getSwipeCards(cards).length > 0);
    });
  }

  getNewInfoCardsViaVoxe(): Observable<Array<InfoCard>> {
    return this.http.get("http://www.voxe.org/wp-json/wp/v2/pages/122")
      .map(data => data.json().content.rendered)
      .map(rendered => this.parseRawContent(rendered));
  }

  parseRawContent(raw: string): Array<InfoCard> {
    let result: Array<InfoCard> = [];
    let indexStartTab = raw.indexOf("[tab title=&nbsp;&raquo;<strong>2 min 30 </strong>&nbsp;&raquo;");

    if (indexStartTab > -1) {
      let indexEndTab = raw.slice(indexStartTab).indexOf("[/tab]");
      raw = raw.substr(indexStartTab, indexEndTab);

      let indexStartA = raw.indexOf("<a");
      while (indexStartA > -1) {
        raw = raw.slice(indexStartA);
        let indexStartHref = raw.indexOf("href=\"");
        let indexEndHref = raw.slice(indexStartHref+6).indexOf("\"");
        let infoUrl = raw.substr(indexStartHref+6,indexEndHref);

        let indexStartImg = raw.indexOf("<img");
        let indexEndA = raw.indexOf("</a>");
        if (indexEndA > indexStartImg) {
          raw = raw.slice(indexStartImg);
          let indexStartSrc = raw.indexOf("src=\"");
          let indexEndSrc = raw.slice(indexStartSrc+5).indexOf("\"");
          let imgUrl = raw.substr(indexStartSrc+5,indexEndSrc);

          if (!this.alreadyInStoreInfoCards.filter(card => card.infoUrl[0] == infoUrl && card.image == imgUrl).length) {
            result.push(new InfoCard(imgUrl,[infoUrl]));
          }
        }
        raw = raw.slice(indexEndA);
        indexStartA = raw.indexOf("<a");
      }
    }
    return result;
  }

  insertSwipeCards(cards: Array<InfoCard|SwipeCard>) {
    this.candidateService.getCandidacyById(this.main.hamonId).subscribe(candidacy => this.swipeCards[0].stats.candidacies[0] = candidacy);
    this.candidateService.getCandidacyById(this.main.poutouId).subscribe(candidacy => this.swipeCards[0].stats.candidacies[1] = candidacy);
    this.swipeCards[0].hasBeenDone = true;
    cards.splice(1, 0, this.swipeCards[0]);
    cards.splice(2, 0, this.swipeCards[1]);
    cards.splice(4, 0, this.swipeCards[2]);
    cards.splice(7, 0, this.swipeCards[3]);
    cards.splice(8, 0, this.swipeCards[4]);
    return cards;
  }

  swipeCards: Array<SwipeCard> = [
    new SwipeCard("assets/img/home-swipe-5.png","Solidarité, Santé et Logement",[this.main.santeId],[this.main.hamonId, this.main.poutouId]),
    new SwipeCard("assets/img/home-swipe-3.png","Justice, Sécurité et Défense",[this.main.justiceId],[this.main.dupontAignanId, this.main.lePenId]),
    new SwipeCard("assets/img/home-swipe-1.png","Emploi",[this.main.emploiId],[this.main.arthaudId, this.main.melenchonId]),
    new SwipeCard("assets/img/home-swipe-4.png","Europe",[this.main.europeId],[this.main.cheminadeId, this.main.macronId]),
    new SwipeCard("assets/img/home-swipe-2.png","Services publics et Territoires",[this.main.territoiresId],[this.main.fillonId, this.main.asselineauId])
  ];
}

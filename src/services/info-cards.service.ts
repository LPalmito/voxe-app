import {Injectable} from "@angular/core";
import {InfoCard, SwipeCard} from "../pages/home/home";
import {MainService} from "./main.service";
import {CandidateService} from "./candidates.service";
import {Observable} from "rxjs";
import {Jsonp} from "@angular/http";

@Injectable()
export class InfoCardsService {

  alreadyInStoreInfoCards: Array<InfoCard> = [];
  areSwipeCardsEmpty: boolean = true;

  constructor(private main: MainService, private jsonp: Jsonp, private candidateService: CandidateService) {
    this.main.cards.subscribe(cards => {
      this.alreadyInStoreInfoCards = this.main.getInfoCards(cards);
      this.areSwipeCardsEmpty = !(this.main.getSwipeCards(cards).length > 0);
    });
  }

  getNewInfoCardsViaVoxe(): Observable<Array<InfoCard>> {
    return this.jsonp.get("http://www.voxe.org/wp-json/wp/v2/pages/122"+this.main.callback)
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

  // Used to initialize a few Swipe Cards on first app opening
  insertSwipeCards(cards: Array<InfoCard|SwipeCard>) {
    cards.splice(1, 0, this.swipeCards[0]);
    cards.splice(2, 0, this.swipeCards[1]);
    cards.splice(4, 0, this.swipeCards[2]);
    cards.splice(7, 0, this.swipeCards[3]);
    cards.splice(8, 0, this.swipeCards[4]);
    return cards;
  }

  hamonId = "58b69f469f3f14a49f000022";
  macronId = "58b46bf8b7286ef02e00009f";
  asselineauId = "58c92078d3b212636d0000c8";
  fillonId = "58c920ded3b2120d5d0000cd";
  cheminadeId = "58c153f1b19d2f2cd5000084";
  melenchonId = "58b69cda9f3f14497500001e";
  lePenId = "58b69f3e9f3f14039a000021";
  arthaudId = "58c91f8ad3b21298910000be";
  dupontAignanId = "58c91ff4d3b212f0fa0000c3";
  poutouId = "58cec5c5d87ba3f5900002ba";

  santeId = "4ef479fcbc60fb00040001c8";
  justiceId = "4ef479f9bc60fb00040000cc";
  europeId = "4ef479fcbc60fb0004000204";
  emploiId = "4ef479f9bc60fb000400009a";

  swipeCards: Array<SwipeCard> = [
    new SwipeCard("assets/img/home-swipe-5.png","Solidarité, Santé et Logement",[this.santeId],[this.hamonId, this.poutouId]),
    new SwipeCard("assets/img/home-swipe-3.png","Justice, Sécurité et Défense",[this.justiceId],[this.dupontAignanId, this.lePenId]),
    new SwipeCard("assets/img/home-swipe-2.png","Solidarité, Santé et Logement",[this.santeId],[this.fillonId, this.asselineauId]),
    new SwipeCard("assets/img/home-swipe-4.png","Europe",[this.europeId],[this.cheminadeId, this.macronId]),
    new SwipeCard("assets/img/home-swipe-1.png","Emploi",[this.emploiId],[this.arthaudId, this.melenchonId])
  ];
}

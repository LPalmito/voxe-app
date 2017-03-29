import {Injectable} from "@angular/core";
import {InfoCard, SwipeCard, CardType} from "../pages/home/home";
import {MainService} from "./main.service";
import {Observable} from "rxjs";
import {Http} from "@angular/http";

@Injectable()
export class InfoCardsService {

  alreadyInStoreInfoCards: Array<InfoCard> = [];
  areSwipeCardsEmpty: boolean = true;

  constructor(private main: MainService, private http: Http) {
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
            result.push({
              image: imgUrl,
              isStar: false,
              isArchive: false,
              isActive: false,
              infoUrl: [infoUrl],
              isHTML: true,
              type: CardType.Info
            });
          }
        }
        raw = raw.slice(indexEndA);
        indexStartA = raw.indexOf("<a");
      }
    }
    return result;
  }

  insertSwipeCards(cards: Array<InfoCard|SwipeCard>) {
    cards.splice(1, 0, this.swipeCards[0]);
    cards.splice(2, 0, this.swipeCards[1]);
    cards.splice(4, 0, this.swipeCards[2]);
    cards.splice(7, 0, this.swipeCards[3]);
    cards.splice(8, 0, this.swipeCards[4]);
    return cards;
  }

  swipeCards: Array<SwipeCard> = [
    {
      title: "Solidarité, Santé et Logement",
      image: "assets/img/home-swipe-5.png",
      tagIds: [this.main.santeId],
      isStar: false,
      isArchive: false,
      isActive: false,
      type: CardType.Swipe,
      candidacyIds: [this.main.hamonId, this.main.poutouId]
    },
    {
      title: "Justice, Sécurité et Défense",
      image: "assets/img/home-swipe-3.png",
      tagIds: [this.main.justiceId],
      isStar: false,
      isArchive: false,
      isActive: false,
      type: CardType.Swipe,
      candidacyIds: [this.main.dupontAignanId, this.main.lePenId]
    },
    {
      title: "Emploi",
      image: "assets/img/home-swipe-1.png",
      tagIds: [this.main.emploiId],
      isStar: false,
      isArchive: false,
      isActive: false,
      type: CardType.Swipe,
      candidacyIds: [this.main.arthaudId, this.main.melenchonId]
    },
    {
      title: "Europe",
      image: "assets/img/home-swipe-4.png",
      tagIds: [this.main.europeId],
      isStar: false,
      isArchive: false,
      isActive: false,
      type: CardType.Swipe,
      candidacyIds: [this.main.cheminadeId, this.main.macronId]
    },
    {
      title: "Services publics et Territoires",
      image: "assets/img/home-swipe-2.png",
      tagIds: [this.main.territoiresId],
      isStar: false,
      isArchive: false,
      isActive: false,
      type: CardType.Swipe,
      candidacyIds: [this.main.fillonId, this.main.asselineauId]
    }
  ];
}

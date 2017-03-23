import {Injectable} from "@angular/core";
import {InfoCard, SwipeCard, CardType} from "../pages/home/home";
import {MainService} from "./main.service";
import {AppStore} from "../store";
import {Observable} from "rxjs";
import {Store} from "@ngrx/store";
import {Jsonp, Http} from "@angular/http";

@Injectable()
export class InfoCardsService {

  cards: Observable<Array<InfoCard|SwipeCard>>;
  infoUrl: Observable<Array<string>>;
  isHTML: Observable<boolean>;
  //callback = "?callback=JSONP_CALLBACK";
  //testCardJsonp: InfoCard;

  constructor(private main: MainService, private store: Store<AppStore>, private jsonp: Jsonp, private http: Http) {
    this.cards = store.select('cards');
    this.infoUrl = store.select('infoUrl');
    this.isHTML = store.select('isHTML');
    // this.getInfoCardsViaVoxeJsonp().subscribe(infoCards => {
    //   this.testCardJsonp = infoCards[0];
    //   console.log('Jsonp',this.testCardJsonp);
    // });
  }

  allCards: Array <InfoCard|SwipeCard> = [
      {
        image: "assets/img/home-melenchon.png",
        isStar: false,
        isArchive: false,
        isActive: false,
        type: CardType.Info,
        isHTML: true,
        infoUrl: ["http://www.voxe.org/jean-luc-melenchon/"]
      },
      {
        image: "assets/img/home-arthaud.png",
        isStar: false,
        isArchive: false,
        isActive: false,
        type: CardType.Info,
        isHTML: true,
        infoUrl: ["http://www.voxe.org/nathalie-arthaud/"]
      },
      {
        image: "assets/img/home-asselineau.png",
        isStar: false,
        isArchive: false,
        isActive: false,
        type: CardType.Info,
        isHTML: true,
        infoUrl: ["http://www.voxe.org/francois-asselineau/"]
      },
      {
        image: "assets/img/home-cheminade.png",
        isStar: false,
        isArchive: false,
        isActive: false,
        type: CardType.Info,
        isHTML: true,
        infoUrl: ["http://www.voxe.org/jacques-cheminade/"]
      },
      {
        image: "assets/img/home-dupont-aignan.png",
        isStar: false,
        isArchive: false,
        isActive: false,
        type: CardType.Info,
        isHTML: true,
        infoUrl: ["http://www.voxe.org/nicolas-dupont-aignan/"]
      },
      {
        image: "assets/img/home-fillon.png",
        isStar: false,
        isArchive: false,
        isActive: false,
        type: CardType.Info,
        isHTML: true,
        infoUrl: ["http://www.voxe.org/francois-fillon/"]
      },
      {
        image: "assets/img/home-front-national.png",
        isStar: false,
        isArchive: false,
        isActive: false,
        type: CardType.Info,
        isHTML: true,
        infoUrl: ["http://www.voxe.org/front-national/"]
      },
      {
        image: "assets/img/home-hamon.png",
        isStar: false,
        isArchive: false,
        isActive: false,
        type: CardType.Info,
        isHTML: true,
        infoUrl: ["http://www.voxe.org/benoit-hamon/"]
      },
      {
        image: "assets/img/home-lassalle.png",
        isStar: false,
        isArchive: false,
        isActive: false,
        type: CardType.Info,
        isHTML: true,
        infoUrl: ["http://www.voxe.org/jean-lassalle/"]
      },
      {
        image: "assets/img/home-le-pen.png",
        isStar: false,
        isArchive: false,
        isActive: false,
        type: CardType.Info,
        isHTML: true,
        infoUrl: ["http://www.voxe.org/marine-le-pen/"]
      },
      {
        image: "assets/img/home-legalisation-cannabis.png",
        isStar: false,
        isArchive: false,
        isActive: false,
        type: CardType.Info,
        isHTML: true,
        infoUrl: ["http://www.voxe.org/cannabis-legalisation-france/"]
      },
      {
        image: "assets/img/home-macron.png",
        isStar: false,
        isArchive: false,
        isActive: false,
        type: CardType.Info,
        isHTML: true,
        infoUrl: ["http://www.voxe.org/emmanuel-macron/"]
      },
      {
        image: "assets/img/home-poutou.png",
        isStar: false,
        isArchive: false,
        isActive: false,
        type: CardType.Info,
        isHTML: true,
        infoUrl: ["http://www.voxe.org/philippe-poutou/"]
      },
      {
        image: "assets/img/home-regroupement-familial.png",
        isStar: false,
        isArchive: false,
        isActive: false,
        type: CardType.Info,
        isHTML: true,
        infoUrl: ["http://www.voxe.org/article-regroupement-familial/"]
      },
      {
        title: "François Fillon + Alain Juppé + Numérique = ?",
        image: "assets/img/home-swipe-1.png",
        tagIds: [this.main.numeriqueId],
        isStar: false,
        isArchive: false,
        isActive: false,
        type: CardType.Swipe,
        candidacyIds: [this.main.alainJuppeId, this.main.francoisFillonId]
      },
      {
        image: "assets/img/home-role-president.png",
        isStar: false,
        isArchive: false,
        isActive: false,
        type: CardType.Info,
        isHTML: false,
        infoUrl: ["assets/img/info-role-president.png"]
      },
      {
        image: "assets/img/home-carte-scolaire.png",
        isStar: false,
        isArchive: false,
        isActive: false,
        type: CardType.Info,
        isHTML: false,
        infoUrl: ["assets/img/info-carte-scolaire.png"]
      },
      {
        title: "Nicolas Sarkozy + Alain Juppé + Justice = ?",
        image: "assets/img/home-swipe-3.png",
        tagIds: [this.main.justiceId],
        isStar: false,
        isArchive: false,
        isActive: false,
        type: CardType.Swipe,
        candidacyIds: [this.main.nicolasSarkozyId, this.main.alainJuppeId]
      },
      {
        image: "assets/img/home-35-heures.png",
        isStar: false,
        isArchive: false,
        isActive: false,
        type: CardType.Info,
        isHTML: true,
        infoUrl: ["http://www.voxe.org/35-heures/"]
      },
      {
        image: "assets/img/home-assemblee-constituante.png",
        isStar: false,
        isArchive: false,
        isActive: false,
        type: CardType.Info,
        isHTML: true,
        infoUrl: ["http://www.voxe.org/assemblee-constituante/"]
      },
      {
        image: "assets/img/home-inegalites-revenu.png",
        isStar: false,
        isArchive: false,
        isActive: false,
        type: CardType.Info,
        isHTML: true,
        infoUrl: ["http://www.voxe.org/inegalites-de-revenus/"]
      },
      {
        image: "assets/img/home-cheminade.png",
        isStar: false,
        isArchive: false,
        isActive: false,
        type: CardType.Info,
        isHTML: true,
        infoUrl: ["http://www.voxe.org/jacques-cheminade/"]
      },
      {
        image: "assets/img/home-listes-electorales.png",
        isStar: false,
        isArchive: false,
        isActive: false,
        type: CardType.Info,
        isHTML: true,
        infoUrl: ["http://www.voxe.org/inscription-listes-electorales//"]
      },
      {
        image: "assets/img/home-parti-communiste.png",
        isStar: false,
        isArchive: false,
        isActive: false,
        type: CardType.Info,
        isHTML: true,
        infoUrl: ["http://www.voxe.org/particommunistefrancais/"]
      },
      {
        image: "assets/img/home-primaire-gauche.png",
        isStar: false,
        isArchive: false,
        isActive: false,
        type: CardType.Info,
        isHTML: true,
        infoUrl: ["http://www.voxe.org/primaire-gauche/"]
      },
      {
        image: "assets/img/home-revenu-universel.png",
        isStar: false,
        isArchive: false,
        isActive: false,
        type: CardType.Info,
        isHTML: true,
        infoUrl: ["http://www.voxe.org/revenu-minimum-universel/"]
      },
      {
        image: "assets/img/home-primaire-droite.png",
        isStar: false,
        isArchive: false,
        isActive: false,
        type: CardType.Info,
        isHTML: false,
        infoUrl: ["assets/img/info-primaire-droite.png", "assets/img/info-primaire-droite-2.png"]
      },
      {
        title: "NKM + Jean-François Copé + Education = ?",
        image: "assets/img/home-swipe-2.png",
        tagIds: [this.main.educationId],
        isStar: false,
        isArchive: false,
        isActive: false,
        type: CardType.Swipe,
        candidacyIds: [this.main.nathalieKMId, this.main.jeanFrancoisCopeId]
      },
      {
        image: "assets/img/home-dette-publique.png",
        isStar: false,
        isArchive: false,
        isActive: false,
        type: CardType.Info,
        isHTML: false,
        infoUrl: ["assets/img/info-dette-publique.png", "assets/img/info-dette-publique-2.png"]
      },
      {
        image: "assets/img/home-crise-migratoire.png",
        isStar: false,
        isArchive: false,
        isActive: false,
        type: CardType.Info,
        isHTML: false,
        infoUrl: ["assets/img/info-crise-migratoire.png", "assets/img/info-crise-migratoire-2.png"]
      },
      {
        image: "assets/img/home-etat-d-urgence.png",
        isStar: false,
        isArchive: false,
        isActive: false,
        type: CardType.Info,
        isHTML: false,
        infoUrl: ["assets/img/info-etat-d-urgence.png"]
      },
      {
        image: "assets/img/home-prison.png",
        isStar: false,
        isArchive: false,
        isActive: false,
        type: CardType.Info,
        isHTML: false,
        infoUrl: ["assets/img/info-prison.png"]
      },
      {
        image: "assets/img/home-religion-ecole.png",
        isStar: false,
        isArchive: false,
        isActive: false,
        type: CardType.Info,
        isHTML: false,
        infoUrl: ["assets/img/info-religion-ecole.png", "assets/img/info-religion-ecole-2.png", "assets/img/info-religion-ecole-3.png"]
      },
      {
        title: "Nicolas Sarkozy + François Fillon + Europe = ?",
        image: "assets/img/home-swipe-4.png",
        tagIds: [this.main.europeId],
        isStar: false,
        isArchive: false,
        isActive: false,
        type: CardType.Swipe,
        candidacyIds: [this.main.nicolasSarkozyId, this.main.francoisFillonId]
      },
      {
        image: "assets/img/home-cumul-mandats.png",
        isStar: false,
        isArchive: false,
        isActive: false,
        type: CardType.Info,
        isHTML: false,
        infoUrl: ["assets/img/info-cumul-mandats.png", "assets/img/info-cumul-mandats-2.png"]
      },
      {
        image: "assets/img/home-prelevement-source.png",
        isStar: false,
        isArchive: false,
        isActive: false,
        type: CardType.Info,
        isHTML: false,
        infoUrl: ["assets/img/info-prelevement-source.png", "assets/img/info-prelevement-source-2.png"]
      },
      {
        image: "assets/img/home-fiscalite.png",
        isStar: false,
        isArchive: false,
        isActive: false,
        type: CardType.Info,
        isHTML: false,
        infoUrl: ["assets/img/info-fiscalite.png", "assets/img/info-fiscalite-2.png"]
      },
      {
        image: "assets/img/home-fiche-s.png",
        isStar: false,
        isArchive: false,
        isActive: false,
        type: CardType.Info,
        isHTML: false,
        infoUrl: ["assets/img/info-fiche-s.png", "assets/img/info-fiche-s-2.png"]
      },
      {
        image: "assets/img/home-primaire-ecologiste.png",
        isStar: false,
        isArchive: false,
        isActive: false,
        type: CardType.Info,
        isHTML: false,
        infoUrl: ["assets/img/info-primaire-ecologiste.png"]
      },
      {
        image: "assets/img/home-cigeo.png",
        isStar: false,
        isArchive: false,
        isActive: false,
        type: CardType.Info,
        isHTML: false,
        infoUrl: ["assets/img/info-cigeo.png", "assets/img/info-cigeo-2.png"]
      }
    ];

  // getInfoCardsViaVoxeJsonp(): Observable<Array<InfoCard>> {
  //   return this.jsonp.get("http://www.voxe.org/wp-json/wp/v2/pages/122"+this.callback)
  //     .map(data => data.json().content.rendered)
  //     .map(rendered => this.parseRawContent(rendered));
  // }

  getInfoCardsViaVoxe(): Observable<Array<InfoCard>> {
    return this.http.get("http://www.voxe.org/wp-json/wp/v2/pages/122")
      .map(data => data.json().content.rendered)
      .map(rendered => this.parseRawContent(rendered));
  }

  parseRawContent(raw: string): Array<InfoCard> {
    let result: Array<InfoCard> = [];
    let index0 = raw.indexOf("[tab title=&nbsp;&raquo;<strong>2 min 30 </strong>&nbsp;&raquo;");

    if (index0 > -1) {
      let parsedRaw0 = raw.slice(index0);
      let index1 = parsedRaw0.indexOf("<a");
      let indexEndTab = parsedRaw0.indexOf("[/tab]");

      while (index1 > -1 && index1 < indexEndTab) {
        let parsedRaw1 = parsedRaw0.slice(index1);
        let index2 = parsedRaw1.indexOf("href=\"");
        let parsedRaw2 = parsedRaw1.slice(index2 + 6);
        let index3 = parsedRaw2.indexOf("\"");
        let parsedRaw3 = parsedRaw2.slice(0,index3);
        let index4 = parsedRaw1.indexOf("<img");
        let index4bis = parsedRaw1.indexOf("</a>");

        if (index4bis > index4) {
          let parsedRaw4 = parsedRaw1.slice(index4);
          let index5 = parsedRaw4.indexOf("src=\"");
          let parsedRaw5 = parsedRaw4.slice(index5 + 5);
          let index6 = parsedRaw5.indexOf("\"");
          let parsedRaw6 = parsedRaw5.slice(0,index6);
          parsedRaw0 = parsedRaw5;

          result.push({
            image: parsedRaw6,
            isStar: false,
            isArchive: false,
            isActive: false,
            infoUrl: [parsedRaw3],
            isHTML: true,
            type: CardType.Info
          });
        }
        else {
          parsedRaw0 = parsedRaw2;
        }
        index1 = parsedRaw0.indexOf("<a");
        indexEndTab = parsedRaw0.indexOf("[/tab]");
      }
    }
    return result;
  }
}

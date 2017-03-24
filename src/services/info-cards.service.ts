import {Injectable} from "@angular/core";
import {InfoCard, SwipeCard, CardType} from "../pages/home/home";
import {MainService} from "./main.service";
import {AppStore} from "../store";
import {Observable} from "rxjs";
import {Store} from "@ngrx/store";

@Injectable()
export class InfoCardsService {

  cards: Observable<Array<InfoCard|SwipeCard>>;
  infoUrl: Observable<Array<string>>;
  isHTML: Observable<boolean>;

  constructor(private main: MainService, private store: Store<AppStore>) {
    this.cards = store.select('cards');
    this.infoUrl = store.select('infoUrl');
    this.isHTML = store.select('isHTML');
  }
    allCards: Array <InfoCard|SwipeCard> = [
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
        title: "Europe",
        image: "assets/img/home-swipe-4.png",
        tagIds: [this.main.europeId],
        isStar: false,
        isArchive: false,
        isActive: false,
        type: CardType.Swipe,
        candidacyIds: [this.main.macronId, this.main.poutouId]
      },
      {
        title: "Numérique",
        image: "assets/img/home-swipe-1.png",
        tagIds: [this.main.cultureId],
        isStar: false,
        isArchive: false,
        isActive: false,
        type: CardType.Swipe,
        candidacyIds: [this.main.melenchonId, this.main.asselineauId]
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
        image: "assets/img/home-revenu-universel.png",
        isStar: false,
        isArchive: false,
        isActive: false,
        type: CardType.Info,
        isHTML: true,
        infoUrl: ["http://www.voxe.org/revenu-minimum-universel/"]
      },
      {
        title: "Justice, Sécurité et Défense",
        image: "assets/img/home-swipe-3.png",
        tagIds: [this.main.justiceId],
        isStar: false,
        isArchive: false,
        isActive: false,
        type: CardType.Swipe,
        candidacyIds: [this.main.lepenId, this.main.fillonId]
      },
      {
        title: "Éducation",
        image: "assets/img/home-swipe-2.png",
        tagIds: [this.main.educationId],
        isStar: false,
        isArchive: false,
        isActive: false,
        type: CardType.Swipe,
        candidacyIds: [this.main.arthaudId, this.main.lassalleId]
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
        image: "assets/img/home-melenchon.png",
        isStar: false,
        isArchive: false,
        isActive: false,
        type: CardType.Info,
        isHTML: true,
        infoUrl: ["http://www.voxe.org/jean-luc-melenchon/"]
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
        image: "assets/img/home-asselineau.png",
        isStar: false,
        isArchive: false,
        isActive: false,
        type: CardType.Info,
        isHTML: true,
        infoUrl: ["http://www.voxe.org/francois-asselineau/"]
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
        image: "assets/img/home-legalisation-cannabis.png",
        isStar: false,
        isArchive: false,
        isActive: false,
        type: CardType.Info,
        isHTML: true,
        infoUrl: ["http://www.voxe.org/cannabis-legalisation-france/"]
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
        image: "assets/img/home-front-national.png",
        isStar: false,
        isArchive: false,
        isActive: false,
        type: CardType.Info,
        isHTML: true,
        infoUrl: ["http://www.voxe.org/front-national/"]
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
        image: "assets/img/home-primaire-droite.png",
        isStar: false,
        isArchive: false,
        isActive: false,
        type: CardType.Info,
        isHTML: false,
        infoUrl: ["assets/img/info-primaire-droite.png", "assets/img/info-primaire-droite-2.png"]
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
  }

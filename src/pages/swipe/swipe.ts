import {Component, ViewChild, ViewChildren, QueryList} from '@angular/core';
import 'rxjs/Rx';
import {StackConfig, SwingStackComponent, SwingCardComponent} from 'angular2-swing';
import {StatsPage} from "../stats/stats";
import {HomePage, SwipeCard, Card} from "../home/home";
import {ToastController, NavController, LoadingController} from 'ionic-angular';
import {PropositionService} from "../../services/propositions.service";
import {CandidateService} from "../../services/candidates.service";
import {Tag, Proposition, MainService} from "../../services/main.service";
import {AppStore} from "../../store";
import {Store} from "@ngrx/store";
import {SET_TO_SWIPE_PROPOSITIONS, POP_TO_SWIPE_PROPOSITIONS, PUSH_TO_SWIPE_PROPOSITIONS} from "../../reducers/to-swipe-propositions.reducer";
import {PUSH_SWIPED_PROPOSITIONS, POP_SWIPED_PROPOSITIONS, CLEAR_SWIPED_PROPOSITIONS} from "../../reducers/swiped-propositions.reducer";
import {PUSH_ANSWER, POP_ANSWER, CLEAR_ANSWERS} from "../../reducers/answers.reducer";
import {TagService} from "../../services/tags.service";
import { AlertController } from 'ionic-angular';
import {ARCHIVE_CARD} from "../../reducers/cards.reducer";

// TODO: Change the structure to accept the "ask" attribute
export interface Answer {
  proposition: Proposition,
  approved: boolean
}

// 'directives' does not exist in 'Component', use 'declarations' in 'NgModule' instead:
// http://stackoverflow.com/questions/39886792/directive-does-not-exist-in-type-component
@Component({
  templateUrl: 'swipe.html',
})

export class SwipePage {
  @ViewChild('myswing1') swingStack: SwingStackComponent;
  @ViewChildren('mypropositions1') swingPropositions: QueryList<SwingCardComponent>;

  stackConfig: StackConfig;
  toSwipePropositions: Array<Proposition>;
  swipedPropositions: Array<Proposition>;
  answers: Answer[];
  candidacyIds: string[];
  tagIds: string[];
  tags: Tag[] = [];
  activeCard: SwipeCard;

  constructor(private main: MainService, public loadingController: LoadingController, public toastCtrl: ToastController, public store: Store<AppStore>, public nav: NavController,
              private tagService: TagService, private propositionService: PropositionService, private candidateService: CandidateService, public alertCtrl: AlertController) {

    // Look for active card
    this.main.getCurrentCard().subscribe(card => this.activeCard = <SwipeCard> card);

    // Get tags
    this.tagService.tagIds.subscribe(tagIds => tagIds.forEach(tagId => {
      this.tagService.getTagById(tagId).subscribe(tag => this.tags.push(tag));
    }));

    // From services
    this.candidateService.candidacyIds.subscribe(x => this.candidacyIds = <Array<string>> x);
    this.tagService.tagIds.subscribe(x => this.tagIds = <Array<string>> x);
    this.propositionService.toSwipePropositions.subscribe(x => this.toSwipePropositions = <Array<Proposition>> x);
    this.propositionService.swipedPropositions.subscribe(x => this.swipedPropositions = <Array<Proposition>> x);
    this.propositionService.answers.subscribe(x => this.answers = <Array<Answer>> x);

    // Clear swiped propositions and answers
    this.store.dispatch({type: CLEAR_SWIPED_PROPOSITIONS, payload: null});
    this.store.dispatch({type: CLEAR_ANSWERS, payload: null});

    let loader = this.loadingController.create({
      content: "2 candidats, un thème, c'est parti !"
    });
    loader.present();

    let timer = setTimeout(() => {
      loader.dismissAll();
      this.showAlert()
    },10000);

    // Initialisation of the propositions to swipe
    this.propositionService.getPropositionsForSwipe(this.candidacyIds, this.tagIds, 5)
      .subscribe(arr => {
        this.store.dispatch({type: SET_TO_SWIPE_PROPOSITIONS, payload: arr});
        loader.dismissAll();
        clearTimeout(timer);
      });

    // Initialisation of the stack
    this.stackConfig = {
      throwOutConfidence: (offset, element) => {
        return Math.min(Math.abs(offset) / (element.offsetWidth/2), 1);
      },
      transform: (element, x, y, r) => SwipePage.onItemMove(element, x, y, r),
      throwOutDistance: d => 800
    };
  }

  // TODO: Resolve the color bug when dragging but not coming back to white
  // TODO: Change the color when dragging a card
  static onItemMove(element, x, y, r) {
    let color = '';
    let abs = Math.abs(x);
    let min = Math.floor(Math.min(16*16 - abs, 16*16));
    let hexCode = SwipePage.decimalToHex(min, 2);
    color = (x < 0)?
      '#FF' + hexCode + hexCode:
      '#' + hexCode + 'FF' + hexCode;
    element.style.background = color;
    element.style['transform'] = `translate3d(0, 0, 0) translate(${x}px, ${y}px) rotate(${r}deg)`;
  }

  // Save the answer of the user
  voteUp(approved: boolean) {
    let answer = {proposition: this.last(this.toSwipePropositions), approved: approved};
    this.store.dispatch({type: PUSH_SWIPED_PROPOSITIONS, payload: this.last(this.toSwipePropositions)});
    this.store.dispatch({type: POP_TO_SWIPE_PROPOSITIONS, payload: null});
    this.store.dispatch({type: PUSH_ANSWER, payload: answer});
    // Redirect to the StatsPage after the last card
    if (this.toSwipePropositions.length == 0) {
      this.nav.push(StatsPage);
      // this.store.dispatch({type: GO_TO, payload: StatsPage});
    }
  }

  // Undo last action
  undo() {
    this.store.dispatch({type: POP_ANSWER, payload: null});
    this.store.dispatch({type: PUSH_TO_SWIPE_PROPOSITIONS, payload: this.last(this.swipedPropositions)});
    this.store.dispatch({type: POP_SWIPED_PROPOSITIONS, payload: null});
    this.cancelToast();
  }

  // TODO: Change the colors
  // http://stackoverflow.com/questions/57803/how-to-convert-decimal-to-hex-in-javascript
  static decimalToHex(d, padding) {
    let hex = Number(d).toString(16);
    padding = typeof (padding) === "undefined" || padding === null ? padding = 2 : padding;
    while (hex.length < padding) {
      hex = "0" + hex;
    }
    return hex;
  }

  // Display a toast with the cancel information on it
  cancelToast() {
    let toast = this.toastCtrl.create({
      message: "Opération annulée",
      duration: 2000,
    });
    toast.present();
  }

  // Alert when timeout
  showAlert() {
    let alert = this.alertCtrl.create({
      title: 'Faire une autre comparaison',
      subTitle: 'Cette comparaison semble un peu lente à venir, on en fait une autre ?',
      buttons: [
        {
          text: 'OK',
          handler: () => {
            this.goHome(this.activeCard)
          }
        }
      ]
    });
    alert.present();
  }

  // Function called to go back to Home if TimeOut
  goHome(card: Card) {
    this.store.dispatch({type: ARCHIVE_CARD, payload: card});
    this.nav.setRoot(HomePage);
  }

  // Helper to get the last element of an array
  last(arr) {
    return arr[arr.length-1]
  }

  getIcon(tag: Tag, size: number): string {
    return this.tagService.getIcon(tag,size);
  }

}

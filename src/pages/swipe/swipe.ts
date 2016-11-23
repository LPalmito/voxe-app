import {Component, ViewChild, ViewChildren, QueryList, NgModule} from '@angular/core';
import {Http} from '@angular/http';
import 'rxjs/Rx';
import {
  StackConfig,
  Stack,
  Card,
  ThrowEvent,
  DragEvent,
  SwingStackComponent,
  SwingCardComponent} from 'angular2-swing';

//!\\
// When launching "npm install angular2-swing@^0.7.1 --save"
// npm WARN optional SKIPPING OPTIONAL DEPENDENCY: fsevents@^1.0.0 (node_modules\chokidar\node_modules\fsevents):
// npm WARN notsup SKIPPING OPTIONAL DEPENDENCY: Unsupported platform for fsevents@1.0.15: wanted {"os":"darwin","arch":"any"} (current: {"os":"win32","arch":"x64"})

// 'directives' does not exist in 'Component', use 'declarations' in 'NgModule' instead:
// http://stackoverflow.com/questions/39886792/directive-does-not-exist-in-type-component
@Component({
  templateUrl: 'swipe.html',
})

export class SwipePage {
  @ViewChild('myswing1') swingStack: SwingStackComponent;
  @ViewChildren('mycards1') swingCards: QueryList<SwingCardComponent>;

  // TODO: Create a 'Card' or 'Proposal' object?
  cards: Array<string>;
  stackConfig: StackConfig;
  recentCard: string = '';

  constructor(private http: Http) {
    this.stackConfig = {
      throwOutConfidence: (offset, element) => {
        return Math.min(Math.abs(offset) / (element.offsetWidth/2), 1);
      },
      transform: (element, x, y, r) => {
        SwipePage.onItemMove(element, x, y, r);
      },
      throwOutDistance: (d) => {
        return 800;
      }
    };
  }

  ngAfterViewInit() {
    // Either subscribe in controller or set in HTML
    // this.swingStack.throwin.subscribe((event: DragEvent) => {
    //   event.target.style.background = '#ffffff';
    // });

    // TODO: Move the requests properly to the services
    this.http.get("http://compare.voxe.org/api/v1/propositions/search?limit=10")
      .map(data => data.json().response.propositions)
      .subscribe(data => {
        this.cards = data.map(proposition => proposition.text);
        console.log(this.cards);
      });

    // this.cards = [{email: ''}];
    // this.addNewCards(1);
  }

  // Change the color when dragging a card
  static onItemMove(element, x, y, r) {
    var color = '';
    var abs = Math.abs(x);
    let min = Math.floor(Math.min(16*16 - abs, 16*16));
    let hexCode = SwipePage.decimalToHex(min, 2);

    color = (x < 0)?
      '#FF' + hexCode + hexCode:
      '#' + hexCode + 'FF' + hexCode;

    element.style.background = color;
    element.style['transform'] = `translate3d(0, 0, 0) translate(${x}px, ${y}px) rotate(${r}deg)`;
  }

  // Display the approved/unapproved state
  voteUp(approved: boolean) {
    let removedCard = this.cards.pop();
    // this.addNewCards(1);
    this.recentCard = approved?
      'Proposition approuvée':'Proposition désapprouvée';
  }

  // TODO: Replace it with the real Voxe API
  // Add new cards to our array
  addNewCards(count: number) {
    this.http.get('https://randomuser.me/api/?results=' + count)
      .map(data => data.json().results)
      .subscribe(result => {
        for (let val of result) {
          this.cards.push(val);
        }
      })
  }

  // http://stackoverflow.com/questions/57803/how-to-convert-decimal-to-hex-in-javascript
  static decimalToHex(d, padding) {
    var hex = Number(d).toString(16);
    padding = typeof (padding) === "undefined" || padding === null ? padding = 2 : padding;

    while (hex.length < padding) {
      hex = "0" + hex;
    }

    return hex;
  }

}

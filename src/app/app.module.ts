import {NgModule} from "@angular/core";
import {CUSTOM_ELEMENTS_SCHEMA} from "@angular/core";
import {IonicApp, IonicModule} from "ionic-angular";
import {VoxeApp} from "./app.component";
import {HomePage} from "../pages/home/home";
import {SwipePage} from "../pages/swipe/swipe";
import {SwingStackComponent} from "angular2-swing";
import {SwingCardComponent} from "angular2-swing";

@NgModule({
  declarations: [
    VoxeApp,
    HomePage,
    SwipePage,
    SwingStackComponent,
    SwingCardComponent
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  imports: [
    IonicModule.forRoot(VoxeApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    VoxeApp,
    HomePage,
    SwipePage
  ],
  providers: []
})
export class AppModule {}

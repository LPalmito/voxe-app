import {NgModule} from "@angular/core";
import {IonicApp, IonicModule} from "ionic-angular";
import {VoxeApp} from "./app.component";
import {HomePage} from "../pages/home/home";
import {SwipePage} from "../pages/swipe/swipe";

@NgModule({
  declarations: [
    VoxeApp,
    HomePage,
    SwipePage
  ],
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

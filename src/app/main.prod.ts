import {platformBrowser} from "@angular/platform-browser";
import {enableProdMode} from "@angular/core";
// TODO: Check the issue here:
import {AppModuleNgFactory} from "./app.module.ngfactory";

enableProdMode();
platformBrowser().bootstrapModuleFactory(AppModuleNgFactory);

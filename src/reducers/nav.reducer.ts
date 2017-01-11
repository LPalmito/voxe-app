import {HomePage} from "../pages/home/home";
import {NavController} from "ionic-angular";
import {MainService} from "../../services/main.service";

export const nav = (state: any = [], {type, payload}) => {
  switch (type) {
    case 'GOTO_CARD':
      return payload;
    case 'GOTO_HOME':
      return ;
    case 'GOTO_ARCHIVE':
      return ;
  }
};

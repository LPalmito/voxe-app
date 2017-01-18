import {NavController} from "ionic-angular";

export const GO_TO = "GO_TO";
export const INIT_NAV = "INIT_NAV";

export const nav = (state: NavController, {type, payload}) => {
  switch (type) {
    case INIT_NAV:
      return payload;
    case GO_TO:
      return state.push(payload);
    default:
      return state;
  }
};

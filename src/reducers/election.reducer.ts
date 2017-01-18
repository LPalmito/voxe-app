import {Election} from "../services/main.service";

export const SET_ELECTION = "SET_ELECTION";

export const election = (state: Election, {type, payload}) => {
  switch (type) {
    case SET_ELECTION:
      return payload;
    default:
      return state;
  }
};

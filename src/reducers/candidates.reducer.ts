import {Candidate} from "../services/main.service";

export const SET_CANDIDATES = "SET_CANDIDATES";

export const candidates = (state: Candidate[] , {type, payload}) => {
  switch (type) {
    case SET_CANDIDATES:
      return payload;
    default:
      return state;
  }
};

import {Proposition} from "../services/main.service";

export const SET_PROPOSITIONS = "SET_PROPOSITIONS";

export const propositions = (state: Proposition[] = [], {type,payload}) => {
  switch (type) {
    case SET_PROPOSITIONS:
      return payload;
    default:
      return state;
  }
};

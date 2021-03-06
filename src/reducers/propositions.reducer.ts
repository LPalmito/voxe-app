import {Proposition} from "../services/main.service";

export const SET_PROPOSITIONS = "SET_PROPOSITIONS";
export const ADD_NEW_PROPOSITIONS = "ADD_NEW_PROPOSITIONS";
export const ADD_PROPOSITIONS = "ADD_PROPOSITIONS";

export const propositions = (state: Proposition[] = [], {type,payload}) => {
  switch (type) {
    case SET_PROPOSITIONS:
      return payload;
    case ADD_NEW_PROPOSITIONS:
      return payload.filter(proposition => state.map(p => p.id).indexOf(proposition.id) == -1).concat(state);
    case ADD_PROPOSITIONS:
      return payload.concat(state);
    default:
      return state;
  }
};

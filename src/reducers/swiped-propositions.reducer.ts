import {Proposition} from "../services/main.service";

export const PUSH_SWIPED_PROPOSITIONS = 'PUSH_SWIPED_PROPOSITIONS';
export const POP_SWIPED_PROPOSITIONS = 'POP_SWIPED_PROPOSITIONS';
export const CLEAR_SWIPED_PROPOSITIONS = 'CLEAR_SWIPED_PROPOSITIONS';
export const SET_SWIPED_PROPOSITIONS = 'SET_SWIPED_PROPOSITIONS';

export const swipedPropositions = (state: Proposition[] = [], {type,payload}) => {
  switch (type) {
    case SET_SWIPED_PROPOSITIONS:
      return payload;
    case PUSH_SWIPED_PROPOSITIONS:
      state.push(payload);
      return state;
    case POP_SWIPED_PROPOSITIONS:
      state.pop();
      return state;
    case CLEAR_SWIPED_PROPOSITIONS:
      return [];
    default:
      return state;
  }
}

import {Proposition} from "../services/main.service";

export const SET_SWIPE_PROPOSITIONS = 'SET_SWIPE_PROPOSITIONS';
export const PUSH_SWIPE_PROPOSITION = 'PUSH_SWIPE_PROPOSITION';
export const POP_SWIPE_PROPOSITION = 'POP_SWIPE_PROPOSITION';

export const swipePropositions = (state: Proposition[], {type,payload}) => {
  switch (type) {
    case SET_SWIPE_PROPOSITIONS:
      return payload;
    case PUSH_SWIPE_PROPOSITION:
      state.push(payload);
      return state;
    case POP_SWIPE_PROPOSITION:
      state.pop();
      return state;
    default:
      return state;
  }
}

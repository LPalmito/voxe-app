import {Proposition} from "../services/main.service";

export const SET_TO_SWIPE_PROPOSITIONS = 'SET_TO_SWIPE_PROPOSITIONS';
export const PUSH_TO_SWIPE_PROPOSITIONS = 'PUSH_TO_SWIPE_PROPOSITIONS';
export const POP_TO_SWIPE_PROPOSITIONS = 'POP_TO_SWIPE_PROPOSITIONS';

export const toSwipePropositions = (state: Proposition[], {type,payload}) => {
  switch (type) {
    case SET_TO_SWIPE_PROPOSITIONS:
      return payload;
    case PUSH_TO_SWIPE_PROPOSITIONS:
      state.push(payload);
      return state;
    case POP_TO_SWIPE_PROPOSITIONS:
      state.pop();
      return state;
    default:
      return state;
  }
}

import {Proposition} from "../services/main.service";

export const PUSH_DONE_PROPOSITION = 'PUSH_DONE_PROPOSITION';
export const POP_DONE_PROPOSITION = 'POP_DONE_PROPOSITION';
export const CLEAR_DONE_PROPOSITIONS = 'CLEAR_DONE_PROPOSITIONS';

export const donePropositions = (state: Proposition[], {type,payload}) => {
  switch (type) {
    case PUSH_DONE_PROPOSITION:
      state.push(payload);
      return state;
    case POP_DONE_PROPOSITION:
      state.pop();
      return state;
    case CLEAR_DONE_PROPOSITIONS:
      return [];
    default:
      return state;
  }
}

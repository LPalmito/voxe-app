import {Answer} from "../pages/swipe/swipe";

export const POP_ANSWER = 'POP_ANSWER';
export const PUSH_ANSWER = 'PUSH_ANSWER';
export const CLEAR_ANSWERS = 'CLEAR_ANSWERS';

export const answers = (state: Answer[], {type,payload}) => {
  switch (type) {
    case POP_ANSWER:
      state.pop();
      return state;
    case PUSH_ANSWER:
      state.push(payload);
      return state;
    case CLEAR_ANSWERS:
      return [];
    default:
      return state;
  }
}

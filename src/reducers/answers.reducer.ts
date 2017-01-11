import {Answer} from "../pages/swipe/swipe";

export const answers = (state: Answer[], {type,payload}) => {
  switch (type) {
    case 'POP':
      state.pop();
      return state;
    case 'PUSH':
      state.push(payload);
      return state;
    default:
      return state;
  }
}

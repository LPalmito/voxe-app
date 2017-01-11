import {Proposition} from "../services/main.service";

export const swipePropositions = (state: Proposition[], {type,payload}) => {
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

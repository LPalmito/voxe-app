import {Card, SwipeCard, InfoCard} from "../pages/home/home";

// TODO: Changer les methods dans home.ts & archive.ts

export const cards = (state: Array<InfoCard|SwipeCard>, {type,payload}) => {
  switch (type) {
    case 'ADD_CARD':
      state.unshift(payload);
      return state;
    case 'DELETE_CARD':
      state.splice(state.indexOf(payload),1);
      return state;
    case 'ARCHIVE_CARD':
      state[state.indexOf(payload)].isArchive = true;
      return state;
    case 'RESTORE_CARD':
      state[state.indexOf(payload)].isArchive = false;
      return state;
    case 'STAR_CARD':
      let card = state[state.indexOf(payload)];
      if (card.isStar) {
        card.isStar = false;
      }
      else {
        card.isStar = true;
      }
      return state;
    default:
      return state;
  }
}

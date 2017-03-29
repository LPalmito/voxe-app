import {SwipeCard, InfoCard} from "../pages/home/home";

export const SET_CARDS = 'SET_CARDS';
export const ADD_CARDS = 'ADD_CARDS';
export const ADD_CARD = 'ADD_CARD';
export const ARCHIVE_CARD = 'ARCHIVE_CARD';
export const RESTORE_CARD = 'RESTORE_CARD';
export const STAR_CARD = 'STAR_CARD';
export const ACTIVE_CARD = 'ACTIVE_CARD';
export const MARK_CARD_DONE = 'MARK_CARD_DONE';

export const cards = (state: Array<InfoCard|SwipeCard> = [], {type,payload}) => {
  switch (type) {
    case SET_CARDS:
      return payload;
    case ADD_CARDS:
      return payload.concat(state);
    case ADD_CARD:
      return [payload].concat(state);
    case ARCHIVE_CARD:
      return state.map(card => {
        if (card == payload) {
          card.isArchive = true;
          return card;
        }
        else {
          return card;
        }
      });
    case RESTORE_CARD:
      return state.map(card => {
        if (card == payload) {
          card.isArchive = false;
          return card;
        }
        else {
          return card;
        }
      });
    case STAR_CARD:
      return state.map(card => {
        if (card == payload) {
          card.isStar = !card.isStar;
          return card;
        }
        else {
          return card;
        }
      });
    case ACTIVE_CARD:
      return state.map(card => {
        card.isActive = false;
        if (card == payload) {
          card.isActive = !card.isActive;
          return card;
        }
        else {
          return card;
        }
      });
    case MARK_CARD_DONE:
      return state.map(card => {
        if(card == payload.card) {
          let swipeCard = <SwipeCard> card;
          swipeCard.hasBeenDone = true;
          swipeCard.stats = payload.stats;
          return swipeCard;
        }
        else {
          return card;
        }
      });
    default:
      return state;
  }
};

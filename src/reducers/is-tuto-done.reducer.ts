export const MARK_TUTO_DONE = "MARK_TUTO_DONE";

export const isTutoDone = (state: boolean, {type, payload}) => {
  switch (type) {
    case MARK_TUTO_DONE:
      return payload;
    default:
      return state;
  }
};

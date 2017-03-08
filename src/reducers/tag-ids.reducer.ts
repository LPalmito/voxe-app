export const SET_TAG_IDS = 'SET_TAG_IDS';

export const tagIds = (state: string[] = [], {type,payload}) => {
  switch (type) {
    case SET_TAG_IDS:
      return payload;
    default:
      return state;
  }
};

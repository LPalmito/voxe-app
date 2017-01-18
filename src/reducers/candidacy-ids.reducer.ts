export const SET_CANDIDACY_IDS = 'SET_CANDIDACY_IDS';

export const candidacyIds = (state: string[] =[], {type,payload}) => {
  switch (type) {
    case SET_CANDIDACY_IDS:
      return payload;
    default:
      return state;
  }
}

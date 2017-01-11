export const SET_INFO_URL = 'SET_INFO_URL';

export const infoUrl = (state: string, {type,payload}) => {
  switch (type) {
    case SET_INFO_URL:
      return payload;
    default:
      return state;
  }
};

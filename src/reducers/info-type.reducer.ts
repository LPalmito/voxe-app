export const SET_INFO_TYPE = 'SET_INFO_TYPE';

export const isHTML = (state: Boolean = false, {type,payload}) => {
  switch (type) {
    case SET_INFO_TYPE:
      return payload;
    default:
      return state;
  }
};

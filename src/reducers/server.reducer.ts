export const SET_SERVER = "SET_SERVER";

export const server = (state: string = "http://compare.voxe.org/api/v1/", {type, payload}) => {
  switch (type) {
    case SET_SERVER:
      return payload;
    default:
      return state;
  }
};

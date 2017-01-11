export const SET_ELECTION_NAME_SPACE = "SET_ELECTION_NAME_SPACE";

export const electionNameSpace = (state: string = "primaire-de-la-droite-2016", {type, payload}) => {
  switch (type) {
    case SET_ELECTION_NAME_SPACE:
      return payload;
    default:
      return state;
  }
};


export const infoUrl = (state: string, {type,payload}) => {
  switch (type) {
    case 'UPDATE':
      return payload;
    default:
      return state;
  }
};

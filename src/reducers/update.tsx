// type updateAction = { type: 'SET_UPDATE' };

export const updateReducer = (state = false, action: any) => {
  switch (action.type) {
    case 'SET_UPDATE':
      return true;
    case 'SET_CREATE':
      return false;
    default:
      return state;
  }
};

const setUpdate = () => {
  return {
    type: 'SET_UPDATE',
  };
};

const setCreate = () => {
  return {
    type: 'SET_CREATE',
  };
};

export const updateActions = {
  setUpdate,
  setCreate,
};

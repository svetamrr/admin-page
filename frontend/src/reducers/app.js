const initialState = {
  isLoading: false,
  deleteUserModal: false
}

const appReducer = function(state = initialState, action) {
  switch (action.type) {
    case 'START_LOADING':
      return { ...state, isLoading: true }
    case 'STOP_LOADING':
      return { ...state, isLoading: false }
    case 'TOGGLE_DELETE_USER_MODAL':
      return { ...state, deleteUserModal: action.flag }
    default:
    return state;
  }
}

export default appReducer;

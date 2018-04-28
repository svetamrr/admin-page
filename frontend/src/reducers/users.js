const initialState = {
  list: [],
  user: {},
  filteredList: [],
  shouldRedirect: false,
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'ADD_USER_SUCCESS':
      return { ...state, shouldRedirect: true };
    case 'ADD_USER_FAIL':
      console.warn('error adding user from server');
      return { ...state, shouldRedirect: false };

    case 'GET_USERS':
      return { ...state, shouldRedirect: false};
    case 'GET_USERS_SUCCESS':
      return {
        ...state,
        shouldRedirect: false,
        list: action.users,
        filteredList: action.users
      };
    case 'GET_USERS_FAIL':
      console.warn('error getting users from server');
      return { ...state };

    case 'GET_GROUP_BY_NAME_SUCCESS':
      return { 
        ...state,
        list: action.data.users,
        filteredList: action.data.users,
      }
    case 'UPDATE_USER_SUCCESS':
      return { ...state, shouldRedirect: true};
    case 'UPDATE_USER_FAIL':
      console.warn('error getting user from server');
      return { ...state, shouldRedirect: false };

    case 'ADD_GROUP_TO_USER_SUCCESS': 
      return {...state, user: action.data };
    case 'ADD_GROUP_TO_USER_FAIL':
      console.warn('error adding group to user from server');
      return { ...state };
      
    case 'REMOVE_GROUP_FROM_USER_SUCCESS':
      return { ...state, user: action.data };
    case 'REMOVE_GROUP_FROM_USER_FAIL':
      console.warn('error removing group from user from server');
      return { ...state };

    case 'REMOVE_USER_SUCCESS':
      return { ...state, list: action.users, filteredList: action.users };
    case 'REMOVE_USER_FAIL':
      console.warn('error deleting user from server');
      return { ...state };

    case 'GET_USER_BY_USERNAME_SUCCESS':
      return { ...state, user: action.data.user[0] };
    case 'GET_USER_BY_USERNAME_FAIL':
      console.warn('error getting user from server');
      return { ...state, user: {} };

    case 'FILTER_USERS':
      const lowerValue = action.value.toLowerCase();
      const filteredList = state.list.filter((item) => {
        return item.username.toLowerCase().indexOf(lowerValue) > -1 ||
               item.firstName.toLowerCase().indexOf(lowerValue) > -1 ||
               item.lastName.toLowerCase().indexOf(lowerValue) > -1 ||
               item.email.toLowerCase().indexOf(lowerValue) > -1;
      });
      return { 
        ...state,
        filteredList
      };
      
    default:
      return state;
  }
}

export default userReducer;

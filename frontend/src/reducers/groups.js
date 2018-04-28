const InitialState = {
  list: [],
  group: {},
  filteredList: [],
  shouldRedirect: false,
};

const groupReducer = (state = InitialState, action) => {
  switch (action.type) {
    case 'ADD_GROUP_SUCCESS':
      return { ...state, shouldRedirect: true };
    case 'ADD_GROUP_FAIL':
      console.warn('error adding group from server');
      return { ...state, shouldRedirect: false };

    case 'GET_GROUPS':
      return { ...state, shouldRedirect: false };
    case 'GET_GROUPS_SUCCESS':
      return {
        ...state,
        shouldRedirect: false,
        list: action.groups,
        filteredList: action.groups
      };
    case 'GET_GROUPS_FAIL':
      console.warn('error getting groups from server');
      return { ...state };

    case 'GET_GROUP_BY_NAME_SUCCESS':
      return { 
        ...state,
        group: action.data.group[0] };
    case 'GET_GROUP_BY_NAME_FAIL':
      console.warn('error getting group from server');
      return { ...state, group: {} };

    case 'GET_USER_BY_USERNAME_SUCCESS':
      return { 
        ...state,
        list: action.data.groups,
        filteredList: action.data.groups,
        };

    case 'UPDATE_GROUP_SUCCESS':
      return { ...state, shouldRedirect: true };
    case 'UPDATE_GROUP_FAIL':
      console.warn('error updating group from server');
      return { ...state, shouldRedirect: false };

    case 'ADD_USER_TO_GROUP_SUCCESS':
      return { ...state, group: action.data };
    case 'ADD_USER_TO_GROUP_FAIL':
      console.warn('error adding user to group from server');
      return { ...state };

    case 'REMOVE_USER_FROM_GROUP_SUCCESS': 
      return { ...state, group: action.data };
    case 'REMOVE_USER_FROM_GROUP_FAIL':
      console.warn('error removing user from group from server');
      return { ...state };

    case 'REMOVE_GROUP_SUCCESS':
      return { ...state, list: action.groups, filteredList: action.groups };
    case 'REMOVE_GROUP_FAIL':
      console.warn('error deleting group from server');
      return { ...state };

    case 'FILTER_GROUPS':
      const lowerValue = action.value.toLowerCase();
      const filteredList = state.list.filter((item) => {
        return item.name.toLowerCase().indexOf(lowerValue) > -1 ||
              item.title.toLowerCase().indexOf(lowerValue) > -1;
      });
      return {
        ...state,
        filteredList
      }

    default:
      return state;
    }
  }

  export default groupReducer;

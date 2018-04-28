export const addGroupSuccess = (group) => {
  return {
    type: 'ADD_GROUP_SUCCESS',
    group
  }
}

export const addGroupFail = () => {
  return {
    type: 'ADD_GROUP_FAIL'
  }
}

export const getGroupsSuccess = (groups) => {
  return {
    type: 'GET_GROUPS_SUCCESS',
    groups
  }
}

export const getGroupsFail = () => {
  return {
    type: 'GET_GROUPS_FAIL'
  }
}

export const updateGroupSuccess = (group) => {
  return {
    type: 'UPDATE_GROUP_SUCCESS',
    group
  }
}

export const updateGroupFail = () => {
  return {
    type: 'UPDATE_GROUP_FAIL'
  }
}

export const getGroupByNameSuccess = (data) => {
  return {
    type: 'GET_GROUP_BY_NAME_SUCCESS',
    data
  }
}

export const getGroupByNameFail = () => {
  return {
    type: 'GET_GROUP_BY_NAME_FAIL'
  }
}

export const addGroupToUserSuccess = (data) => {
  return {
    type: 'ADD_GROUP_TO_USER_SUCCESS',
    data,
  }
}

export const addGroupToUserFail = () => {
  return {
    type: 'ADD_GROUP_TO_USER_FAIL',
  }
}

export const removeGroupFromUserSuccess = (data) => {
  return {
    type: 'REMOVE_GROUP_FROM_USER_SUCCESS',
    data,
  }
}

export const removeGroupFromUserFail = () => {
  return {
    type: 'REMOVE_GROUP_FROM_USER_FAIL',
  }
}

export const removeGroupSuccess = (groups) => {
  return {
    type: 'REMOVE_GROUP_SUCCESS',
    groups
  }
}

export const removeGroupFail = () => {
  return {
    type: 'REMOVE_GROUP_FAIL'
  }
}


export const filterGroups = (value) => {
  return {
    type: 'FILTER_GROUPS',
    value
  }
}
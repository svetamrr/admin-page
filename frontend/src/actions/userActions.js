export const addUserSuccess = (user) => {
  return {
    type: 'ADD_USER_SUCCESS',
    user,
  }
}

export const addUserFail = () => {
  return {
    type: 'ADD_USER_FAIL'
  }
}

export const getUsersSuccess = (users) => {
  return {
    type: 'GET_USERS_SUCCESS',
    users,
  }
}

export const getUsersFail = () => {
  return {
    type: 'GET_USERS_FAIL',
  }
}

export const getUserByUserNameSuccess = (data) => {
  return {
    type: 'GET_USER_BY_USERNAME_SUCCESS',
    data,
  }
}

export const getUserByUserNameFail = () => {
  return {
    type: 'GET_USER_BY_USERNAME_FAIL'
  }
}

export const updateUserSuccess = (user) => {
  return {
    type: 'UPDATE_USER_SUCCESS',
    user,
  }
}

export const updateUserFail = () => {
  return {
    type: 'UPDATE_USER_FAIL'
  }
}

export const addUserToGroupSuccess = (data) => {
  return {
    type: 'ADD_USER_TO_GROUP_SUCCESS',
    data,
  }
}

export const addUserToGroupFail = () => {
  return {
    type: 'ADD_USER_TO_GROUP_FAIL',
  }
}

export const removeUserSuccess = (users) => {
  return {
    type: 'REMOVE_USER_SUCCESS',
    users,
  }
}

export const removeUserFail = () => {
  return {
    type: 'REMOVE_USER_FAIL'
  }
}

export const removeUserFromGroupSuccess = (data) => {
  return {
    type: 'REMOVE_USER_FROM_GROUP_SUCCESS',
    data,
  }
}

export const removeUserFromGroupFail = () => {
  return {
    type: 'REMOVE_USER_FROM_GROUP_FAIL',
  }
}

export const filterUsers = (value) => {
  return {
    type: 'FILTER_USERS',
    value
  }
}

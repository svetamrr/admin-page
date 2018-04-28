import axios from 'axios';
import store from './../store';
import * as userActions from './userActions';
import * as groupActions from './groupActions';
import { toggleDeleteUserModal } from './appActions';
import config from './../config';

const url = `${config.api.host}:${config.api.port}`;
const token = localStorage.getItem('token');

export const login = (credentials) => {
  return function (dispatch) {
    return axios
      .post(`${url}/auth/login`, {
        email: credentials.email,
        password: credentials.password,
      }, {
        headers: { 'Access-Control-Allow-Origin': '*' }
      })
      .then(
        data => {
          localStorage.setItem('token', data.data.token);
          window.location.pathname = '/';
        },
        err => {
          localStorage.setItem('token', '');
      });
  }
}

export const logout = () => {
  return function (dispatch) {
    return axios
      .get(`${url}/auth/logout`, {
        headers: {
          'Access-Control-Allow-Origin': '*',
          authorization: `bearer ${token}`,
        }
      })
      .then(
        data => {
          localStorage.removeItem('token');
          window.location.pathname = '/login';
        },
        err => {
          localStorage.removeItem('token');
      });
  }
}

export const getUsers = () => {
  return function (dispatch) {
    return axios
    .get(`${url}/users`, {
      headers: {
        'Access-Control-Allow-Origin': '*',
        authorization: `bearer ${token}`,
      }
    })
    .then(
      data => {
        dispatch(userActions.getUsersSuccess(data.data));
      },
      err => {
        dispatch(userActions.getUsersFail());
      });
  }
}

export const getUserByUserName = (username) => {
  return function (dispatch) {
    return axios
    .get(`${url}/users/${username}`, {
      headers: {
        'Access-Control-Allow-Origin': '*',
        authorization: `bearer ${token}`,
      }
    })
    .then(
      data => {
        dispatch(userActions.getUserByUserNameSuccess(data.data));
      },
      err => {
        dispatch(userActions.getUserByUserNameFail());
      });
  }
}

export const getGroupByName = (name) => {
  return function (dispatch) {
    return axios
    .get(`${url}/groups/${name}`, {
      headers: {
        'Access-Control-Allow-Origin': '*',
        authorization: `bearer ${token}`,
      }
    })
    .then(
      data => {
        dispatch(groupActions.getGroupByNameSuccess(data.data));
      },
      err => {
        dispatch(groupActions.getGroupByNameFail());
      });
  }
}

export const addUser = (user) => {
  return function (dispatch) {
    return axios
    .post(`${url}/users`, {
      username: user.username,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
    }, {
      headers: {
        'Access-Control-Allow-Origin': '*',
        authorization: `bearer ${token}`,
      }
    })
    .then(
      data => {
        dispatch(userActions.addUserSuccess(data.data));
      },
    err => {
      dispatch(userActions.addUserFail());
    });
  }
}

export const addGroup = (group) => {
  return function (dispatch) {
    return axios
    .post(`${url}/groups`, {
      name: group.name,
      title: group.title,
    },{
      headers: {
        'Access-Control-Allow-Origin': '*',
        authorization: `bearer ${token}`,
      }
    })
    .then(
      data => {
        dispatch(groupActions.addGroupSuccess(data.data));
      },
      err => {
        dispatch(groupActions.addGroupFail());
      });
  }
}

export const updateUser = (user) => {
  return function (dispatch) {
    return axios
    .put(`${url}/users/${user._id}`, {
      username: user.username,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      groups: user.groups,
    }, {
      headers: {
        'Access-Control-Allow-Origin': '*',
        authorization: `bearer ${token}`,
      }
    })
    .then(
      data => {
        dispatch(userActions.updateUserSuccess(data.data));
      },
      err => {
        dispatch(userActions.updateUserFail());
      });
  };
}

export const updateGroup = (group) => {
  return function (dispatch) {
    return axios
    .put(`${url}/groups/${group._id}`, {
      name: group.name,
      title: group.title,
      users: group.users,
    }, {
      headers: {
        'Access-Control-Allow-Origin': '*',
        authorization: `bearer ${token}`,
      }
    })
    .then(
      data => {
        dispatch(groupActions.updateGroupSuccess(data.data));
      },
      err => {
        dispatch(groupActions.updateGroupFail());
      });
  }
}

export const removeUser = (id) => {
  return function (dispatch) {
    return axios
    .delete(`${url}/users/${id}`, {
      headers: {
        'Access-Control-Allow-Origin': '*',
        authorization: `bearer ${token}`,
      }
    })
    .then(
      data => {
        dispatch(userActions.removeUserSuccess(data.data));
        dispatch(toggleDeleteUserModal(false));
      },
    err => {
      dispatch(userActions.removeUserFail());
    });
  };
}

export const removeGroup = (id) => {
  return function (dispatch) {
    return axios
      .delete(`${url}/groups/${id}`, {
        headers: {
          'Access-Control-Allow-Origin': '*',
          authorization: `bearer ${token}`,
        }
      })
      .then(
        data => {
          dispatch(groupActions.removeGroupSuccess(data.data))
          dispatch(toggleDeleteUserModal(false));
        },
        err => {
          dispatch(groupActions.removeGroupFail());
        });
  }
}

export const getGroups = (groups) => {
  return function (dispatch) {
    return axios
    .get(`${url}/groups`, {
      headers: {
        'Access-Control-Allow-Origin': '*',
        authorization: `bearer ${token}`,
      }
    })
    .then(
      data => {
        dispatch(groupActions.getGroupsSuccess(data.data));
      },
      err => {
        dispatch(groupActions.getGroupsFail());
      });
  }
}

export const addGroupToUser = (userId, groupId) => {
  return function (dispatch) {
    return axios
    .post(`${url}/users/${userId}/addGroup`, {
      groupId,
    }, {
      headers: {
        'Access-Control-Allow-Origin': '*',
        authorization: `bearer ${token}`,
      }
    })
    .then(
      data => {
        dispatch(groupActions.addGroupToUserSuccess(data.data));
      },
      err => {
        dispatch(groupActions.addGroupToUserFail());
      });
  }
}

export const removeGroupFromUser = (userId, groupId) => {
  return function (dispatch) {
    return axios
    .post(`${url}/users/${userId}/removeGroup`, {
      groupId,
    }, {
      headers: {
        'Access-Control-Allow-Origin': '*',
        authorization: `bearer ${token}`,
      }
    })
    .then(
      data => {
        dispatch(groupActions.removeGroupFromUserSuccess(data.data));
      },
      err => {
        dispatch(groupActions.removeGroupFromUserFail());
      });
  }
}

export const addUserToGroup = (groupId, userId) => {
  return function (dispatch) {
    return axios
    .post(`${url}/groups/${groupId}/addUser`, {
        userId,
      }, {
        headers: {
          'Access-Control-Allow-Origin': '*',
          authorization: `bearer ${token}`,
        }
      })
    .then(
      data => {
        dispatch(userActions.addUserToGroupSuccess(data.data));
      },
      err => {
        dispatch(userActions.addUserToGroupFail());
      });
  }
}

export const removeUserFromGroup = (groupId, userId) => {
  return function (dispatch) {
    return axios
    .post(`${url}/groups/${groupId}/removeUser`, {
      userId
    }, {
      headers: {
        'Access-Control-Allow-Origin': '*',
        authorization: `bearer ${token}`,
      }
    })
    .then(
      data => {
        dispatch(userActions.removeUserFromGroupSuccess(data.data))
      },
      err => {
        dispatch(userActions.removeUserFromGroupFail());
      });
  }
}

export const search = (value, type) => {
  return function (dispatch) {
    if (type === 'users') {
      dispatch(userActions.filterUsers(value));
    }

    if (type === 'groups') {
      dispatch(groupActions.filterGroups(value));
    }
  }
}

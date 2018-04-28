import { combineReducers } from 'redux';
import app from './app';
import groups from './groups';
import users from './users';

export default combineReducers({ app, groups, users });

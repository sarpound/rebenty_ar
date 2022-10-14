import { combineReducers } from 'redux';
import modelList from './modelList';
import routeName from './routeName';

const allReducers = combineReducers({
  modelList: modelList,
  routeName: routeName
});

export default allReducers;

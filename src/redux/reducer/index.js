import { combineReducers } from 'redux';
import modelList from './modelList';

const allReducers = combineReducers({
  modelList: modelList
});

export default allReducers;

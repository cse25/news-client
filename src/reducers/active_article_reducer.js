import { SELECT_ARTICLE } from '../actions/types';

export default function(state = null, action) {
  switch(action.type) {
    case SELECT_ARTICLE:
      return action.payload
  }
  return state;
}

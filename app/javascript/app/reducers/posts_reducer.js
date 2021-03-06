import { FETCH_POSTS } from '../actions';

export default function postsReducer(state = null, action) {
  switch (action.type) {
    case FETCH_POSTS: {
      return action.payload;
    }
    default:
      return state;
  }
}
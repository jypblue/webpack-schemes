import request from 'axios';

import { SELECT_REDDIT, INVALIDATE_REDDIT,POSTS_GET,POSTS_GET_REQUEST, POSTS_GET_SUCCESS, POSTS_GET_FAILURE } from '../constants/reddit';

export function selectReddit(reddit) {
  return {
    type: SELECT_REDDIT,
    reddit
  };
}

export function invalidateReddit(reddit) {
  return {
    type: INVALIDATE_REDDIT,
    reddit
  };
}

export function fetchPosts(reddit = 'reactjs') {
  return {
    type: POSTS_GET,
    reddit,
    promise: request.get(`http://www.reddit.com/r/${reddit}.json`)
  }
}

function shouldFetchPosts(state, reddit) {
  const posts = state.postsByReddit[reddit];
  if (!posts) {
    return true;
  } else if (posts.isFetching) {
    return false;
  } else {
    return posts.didInvalidate;
  }
}

export function fetchPostsIfNeeded(reddit) {
  return (dispatch, getState) => {
    if (shouldFetchPosts(getState(), reddit)) {
      return dispatch(fetchPosts(reddit));
    }
  };
}

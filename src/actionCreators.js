import axios from "axios";
import {
  ADD_POST,
  REMOVE_POST,
  EDIT_POST,
  ADD_COMMENT,
  DELETE_COMMENT,
  LOAD_POSTS,
  SHOW_SPINNER,
  SHOW_ERROR
} from "./actionTypes";

const BASE_URL = "http://localhost:5000"

//TODO: define payload in these actions AND OTHER
//example of a data structure is very helpful to the reader

/*
 * Action creators returning action
 * Payload: {}
 */

export function addPost(postId, payload) {
  return {
    type: ADD_POST,
    postId,
    payload

  };
}

export function removePost(postId) {
  return {
    type: REMOVE_POST,
    postId
  };
}

export function editPost(postId, payload) {
  return {
    type: EDIT_POST,
    postId,
    payload
  };
}

export function addComment(postId, payload) {
  return {
    type: ADD_COMMENT,
    postId,
    payload
  };
}

export function deleteComment(postId, commentId) {
  return {
    type: DELETE_COMMENT,
    postId,
    commentId
  };
}

export function gotPosts(posts) {
  return {
    type: LOAD_POSTS,
    posts,
  }
}

export function startLoad() {
  return {
    type: SHOW_SPINNER
  }
}

export function showError(msg) {
  return {
    type: SHOW_ERROR,
    msg
  }
}

/** Action creators returning thunk action */

//QUESTION: HOW DO WE DRILL DOWN TO ERROR MESSAGES?

export function getSimplePostsFromAPI() {
  return async function(dispatch) {
    dispatch(startLoad());

    try {
      let res = await axios.get(`${BASE_URL}/api/posts/`);
      console.log("res in try", res);
      dispatch(gotPosts(res.data));
    }

    catch(err) {
      console.log("err in catch", err);
      dispatch(showError(err))
    }
  }
}

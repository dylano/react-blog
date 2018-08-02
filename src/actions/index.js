import Axios from 'axios';

export const FETCH_POSTS = 'FETCH_POSTS';
export const FETCH_POST = 'FETCH_POST';
export const CREATE_POST = 'CREATE_POST';
export const DELETE_POST = 'DELETE_POST';

const URL = 'https://reduxblog.herokuapp.com/api';
const API_KEY = 'key=dooly';

export function fetchPosts() {
  const request = Axios.get(`${URL}/posts?${API_KEY}`);
  return {
    type: FETCH_POSTS,
    payload: request
  };
}

export function createPost(values, callback) {
  const request = Axios.post(`${URL}/posts?${API_KEY}`, values).then(() =>
    callback()
  );

  return {
    type: CREATE_POST,
    payload: request
  };
}

export function fetchPost(id) {
  const request = Axios.get(`${URL}/posts/${id}?${API_KEY}`);

  return {
    type: FETCH_POST,
    payload: request
  };
}

export function deletePost(id, callback) {
  const request = Axios.delete(`${URL}/posts/${id}?${API_KEY}`).then(() =>
    callback()
  );

  return {
    type: DELETE_POST,
    payload: id
  };
}

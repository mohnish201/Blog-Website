import axios from "axios";
import { AUTH_ERROR, AUTH_LOADING, AUTH_SUCCESS, LOGOUT } from "../actionTypes";

export const login = (user) => (dispatch) => {
  dispatch({ type: AUTH_LOADING });
  return axios.post(`${import.meta.env.VITE_SERVER}/users/login`, user);
};

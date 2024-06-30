import axios from "axios";
import { NOTES_ERROR, NOTES_FETCHING, NOTES_LOADING } from "../actionTypes";

let token = localStorage.getItem("token");

export const getNotes = () => (dispatch) => {
  dispatch({ type: NOTES_LOADING });
  axios
    .get(`${import.meta.env.VITE_SERVER}/notes`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then((res) => {
      dispatch({ type: NOTES_FETCHING, payload: res.data });
    })
    .catch((err) => {
      dispatch({ type: NOTES_ERROR });
    });
};

export const createNotes = (newNote) => (dispatch) => {
  return axios.post(`${import.meta.env.VITE_SERVER}/notes/create`, newNote, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const EditNotes = (id, body) => (dispatch) => {
  return axios.patch(`${import.meta.env.VITE_SERVER}/notes/update/${id}`, body, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const DeleteNotes = (id) => () => {
  return axios.delete(`${import.meta.env.VITE_SERVER}/notes/delete/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

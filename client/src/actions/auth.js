import axios from 'axios';
import {
  REGISTER_FAIL,
  REGISTER_SUCCESS,
  AUTH_ERROR,
  USER_LOADED,
  LOGIN_FAIL,
  LOGIN_SUCCESS,
  LOGOUT,
  USER_DELETED,
  USER_ERROR,
  CLEAR_SCHEDULE,
} from './types';
import { setAlert } from './alert';
import setAuthToken from '../utils/setAuthToken';

export const loadUser = () => async (dispatch) => {
  //Set token from localStorage in browser
  if (localStorage.token) {
    setAuthToken(localStorage.token);
  }

  //check to see if user is valid
  try {
    const res = await axios.get('/api/auth');
    dispatch({
      type: USER_LOADED,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: AUTH_ERROR,
    });
  }
};

//Register User
export const register = (name, email, password) => async (dispatch) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  const body = JSON.stringify({ name, email, password });

  try {
    const res = await axios.post('/api/users', body, config);

    dispatch({
      type: REGISTER_SUCCESS,
      payload: res.data, //route sends back token
    });
    dispatch(loadUser());
  } catch (err) {
    const errors = err.response.data.errors;

    if (errors) {
      console.log(errors);
    }

    dispatch(
      setAlert('Incorrect email or password, please try again', 'error')
    );

    dispatch({
      type: REGISTER_FAIL,
    });
  }
};

//Login User
export const login = (email, password) => async (dispatch) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  const body = JSON.stringify({ email, password });
  try {
    const res = await axios.post('/api/auth', body, config);
    dispatch({
      type: LOGIN_SUCCESS,
      payload: res.data, //route sends back token
    });
    dispatch(loadUser());
  } catch (err) {
    const errors = err.response.data.errors;

    if (errors) {
      console.log(errors);
      //   errors.forEach((error) => dispatch(setAlert(error.msg, "danger")));
    }

    dispatch(
      setAlert('Incorrect email or password, please try again', 'error')
    );

    dispatch({
      type: LOGIN_FAIL,
    });
  }
};

//Clear schedule and logout user
export const logout = () => async (dispatch) => {
  dispatch({
    type: CLEAR_SCHEDULE,
  });
  dispatch({
    type: LOGOUT,
  });
};

//Delete account and profile
export const deleteAccount = () => async (dispatch) => {
  if (window.confirm('Are you sure? This can NOT be undone!')) {
    try {
      dispatch({
        //temp clear schedule
        type: CLEAR_SCHEDULE,
      });

      //send request to server to delete user from db
      await axios.delete('/api/users');

      dispatch({ type: USER_DELETED });

      // dispatch(setAlert("Your account has been deleted"));
    } catch (err) {
      dispatch({
        type: USER_ERROR,
        payload: { msg: err.response.statusText, status: err.response.status },
      });
    }
  }
};

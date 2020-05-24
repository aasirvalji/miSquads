import {
  GET_SCHEDULE,
  ADD_EVENT,
  UPDATE_SCHEDULE,
  SCHEDULE_ERROR,
  CLEAR_SCHEDULE,
  CREATE_SCHEDULE,
} from "./types";
import { setAlert } from "./alert";
import axios from "axios";
import { body } from "express-validator";

export const getSchedule = (id) => (dispatch) => {
  axios //making request to backend
    .get(`/api/schedule/${id}`)
    .then((
      res //getting back data
    ) =>
      dispatch({
        type: GET_SCHEDULE,
        payload: res.data, //sending as payload to reducer
      })
    )
    .catch((err) => {
      console.log(err.message);
    });
};

export const createSchedule = (data) => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  try {
    const res = await axios.post(`/api/schedule`, data, config);
    console.log("create schedule action");
    dispatch({
      type: CREATE_SCHEDULE,
      payload: res.data,
    });
  } catch (err) {
    dispatch(
      setAlert(
        "Sorry, there was a problem creating your schedule. Please try again later",
        "success"
      )
    );
    dispatch({
      type: SCHEDULE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

export const addUserToSchedule = (schedule_id, roomKey, history) => async (
  dispatch
) => {
  try {
    console.log("reached 2");
    const res = await axios.put(`/api/schedule/${schedule_id}/${roomKey}`);
    console.log("reached aUTS");
    dispatch({
      type: UPDATE_SCHEDULE,
      payload: res.data, //returns schedule post deletion
    });
    // dispatch(setAlert("Event Removed", "success"));
  } catch (err) {
    console.log("reached 1");
    history.push("/dashboard");
    console.log("reached 2");
    dispatch(setAlert("This schedule no longer exists.", "success"));
    dispatch({
      type: SCHEDULE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

export const changeScheduleName = (schedule_id, data, history) => async (
  dispatch
) => {
  console.log("action called");
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  try {
    const res = await axios.put(`/api/schedule/${schedule_id}`, data, config);
    dispatch({
      type: UPDATE_SCHEDULE,
      payload: res.data, //sending as payload to reducer
    });
  } catch (err) {
    history.push("/dashboard");
    dispatch(setAlert("This schedule no longer exists.", "success"));
    dispatch({
      type: SCHEDULE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

export const deleteSchedule = (schedule_id, history) => async (dispatch) => {
  if (window.confirm("Are you sure? This can NOT be undone!")) {
    try {
      await axios.delete(`/api/schedule/${schedule_id}`);
      dispatch({
        type: CLEAR_SCHEDULE,
      });
      history.push("/dashboard");
      window.location.reload();
    } catch (err) {
      history.push("/dashboard");
      dispatch(setAlert("This schedule no longer exists.", "success"));
      dispatch({
        type: SCHEDULE_ERROR,
        payload: { msg: err.response.statusText, status: err.response.status },
      });
    }
  }
};

export const addEvent = (schedule_id, data, history) => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  console.log("add event action called");
  const res = axios
    .put(`/api/schedule/event/${schedule_id}`, data, config)
    .then(
      (
        res //getting back data
      ) => {
        dispatch({
          type: ADD_EVENT,
          payload: res.data, //sending as payload to reducer
        });
        console.log("alert in schedule reducer");
        dispatch(setAlert("Event Removed", "success"));
      }
    )
    .catch((err) => console.log(err.message));
};

//Delete experience
export const deleteEvent = (schedule_id, event_id, history) => async (
  dispatch
) => {
  try {
    const res = await axios.delete(`/api/schedule/${schedule_id}/${event_id}`);
    dispatch({
      type: UPDATE_SCHEDULE,
      payload: res.data, //returns schedule post deletion
    });

    // dispatch(setAlert("Event Removed", "success"));
  } catch (err) {
    history.push("/dashboard");
    dispatch(setAlert("This schedule no longer exists.", "success"));
    dispatch({
      type: SCHEDULE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

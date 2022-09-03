import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const signup = createAsyncThunk("signup", async (userData) => {
  try {
    const response = await axios.post(
      "https://celahl.herokuapp.com/api/auth/register",
      userData
    );
    if (response.status === 201) {
      const request = await axios.get(
        `https://celahl.herokuapp.com/api//auth/request-email-verification?email=${response.data.data.email}`
      );
      console.log(request);
    }
    return response.data.data;
  } catch (err) {
    throw err.response.data;
  }
});

export const login = createAsyncThunk("login", async (loginData) => {
  try {
    const response = await axios.post(
      "https://celahl.herokuapp.com/api/auth/login",
      loginData
    );

    return response.data;
  } catch (err) {
    throw err;
  }
});

export const Users = createAsyncThunk("allusers", async (page = 2) => {
  try {
    const token = window.JSON.parse(localStorage.getItem("token"));
    const response = await axios.get(
      `https://celahl.herokuapp.com/api//admin/users?limit=10&page=${page}`,
      {
        headers: {
          Authorization: `Bearer ${token} `,
        },
      }
    );
    return response.data.data;
  } catch (err) {
    throw err;
    // console.log(err);
  }
});

export const Properties = createAsyncThunk("properties", async () => {
  try {
    const token = window.JSON.parse(localStorage.getItem("token"));
    const response = await axios.get(
      "https://celahl.herokuapp.com/api/property?populate=images",
      {
        headers: {
          Authorization: `Bearer ${token} `,
        },
      }
    );
    return response.data.data;
  } catch (err) {
    throw err;
    console.log(err);
  }
});

export const Notification = createAsyncThunk("notifications", async () => {
  try {
    const token = window.JSON.parse(localStorage.getItem("token"));
    const response = await axios.get(
      "https://celahl.herokuapp.com/api//notification",
      {
        headers: {
          Authorization: `Bearer ${token} `,
        },
      }
    );
    return response.data.data;
  } catch (err) {
    throw err;
    console.log(err);
  }
});

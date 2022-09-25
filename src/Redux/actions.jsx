import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { BASE_URL } from "../Apis";

const token = window.JSON.parse(localStorage.getItem("token"));
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
      // console.log(request);
    }
    return response.data.data;
  } catch (err) {
    throw err.response.data;
  }
});

export const login = createAsyncThunk(
  "login",
  async (loginData, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        "https://celahl.herokuapp.com/api/auth/login?populate=avatar",
        loginData
      );

      return response.data;
    } catch (err) {
      console.log(rejectWithValue(err));
      throw err;
    }
  }
);

export const User = createAsyncThunk("allusers", async () => {
  try {
    
    const response = await axios.get(
      "https://celahl.herokuapp.com/api//users/profile?populate=avatar&populate=wallet.histories&populate=bankAccounts&orderBy=wallet.histories.updatedAt",
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

export const Properties = createAsyncThunk("properties", async (parameters) => {
  console.log(parameters);
  try {
    
    const response = await axios.get(
      `https://celahl.herokuapp.com/api/property?_searchBy=name&_keyword=${
        parameters?.value || ""
      }&populate=images&page=${parameters?.page || 1}`,
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

export const Overview = createAsyncThunk("overview", async (totalPage) => {
  try {
    
    const response = await axios.get(
      `https://celahl.herokuapp.com/api/property?populate=images&page1=&limit=${totalPage}`,
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

export const Property = createAsyncThunk("property", async (id) => {
  try {
    

    const response = await axios.get(
      `https://celahl.herokuapp.com/api//data/property/${id}`,
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

export const CreateProperty = createAsyncThunk(
  "create/property",
  async (data, { rejectWithValue }) => {
    console.log(rejectWithValue());
    console.log(data);
    try {
      
      // const id = window.JSON.parse(localStorage.getItem("id"));

      const response = await axios.post(
        " https://celahl.herokuapp.com/api//property/",
        data,
        {
          headers: {
            "content-type": "multipart/form-data",
            Authorization: `Bearer ${token} `,
          },
        }
      );

      return response.data.data;
    } catch (err) {
      if (err) {
        console.log(rejectWithValue(err?.response?.data?.message));
        throw rejectWithValue(err);
      }
      console.log(err.response.data.message);
      // throw err;
    }
  }
);

export const EditProperty = createAsyncThunk(
  "edit/property",
  async (data, { rejectWithValue }) => {
    try {
      
      const id = window.JSON.parse(localStorage.getItem("id"));

      const response = await axios.put(
        // `https://celahl.herokuapp.com/api//property/${id}`;
        ` https://celahl.herokuapp.com/api//property/${id}`,
        data,
        {
          headers: {
            "content-type": "multipart/form-data",
            Authorization: `Bearer ${token} `,
          },
        }
      );

      return response.data.data;
    } catch (err) {
      if (err) {
        // console.log(rejectWithValue(err?.response?.data?.message));
        throw rejectWithValue(err);
      }
      console.log(err);
    }
  }
);
export const Notification = createAsyncThunk(
  "notifications",
  async (page = 1) => {
    try {
      
      const response = await axios.get(
        `https://celahl.herokuapp.com/api//notification?page=${page}`,
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
  }
);

export const BankAccounts = createAsyncThunk("bankaccounts", async () => {
  try {
    
    const response = await axios.get(
      " https://celahl.herokuapp.com/api//wallet/banks",
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

export const GetSettings = createAsyncThunk("settings", async () => {
  try {
    
    const response = await axios.get(
      `https://celahl.herokuapp.com/api//settings`,
      {
        headers: {
          Authorization: `Bearer ${token} `,
        },
      }
    );
    return response.data.data;
  } catch (err) {
    throw err;
  }
});

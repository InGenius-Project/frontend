import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { RootState } from "features/store";
import qs from "qs";

const baseUrl = process.env.REACT_APP_SERVER_ENDPOINT as string;

const baseQuery = fetchBaseQuery({
  baseUrl: `${baseUrl}/api`,
  prepareHeaders: (headers, { getState }) => {
    headers.set("Accept", "application/json");

    var token = (getState() as RootState).userState.Token?.AccessToken;
    if (!token) {
      token = localStorage.getItem("accessToken") || undefined;
    }

    if (token) {
      headers.set("Authorization", `Bearer ${token}`);
    }
    return headers;
  },
  paramsSerializer: (params) => qs.stringify(params, { arrayFormat: "repeat" }),
});

export const baseApi = createApi({
  baseQuery,
  endpoints: () => ({}),
  tagTypes: ["User", "Resume", "Area"],
});

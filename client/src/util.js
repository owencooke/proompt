import axios from "axios";
import { auth } from "./firebase";

const BASE_URL = "http://localhost:7890";

const getConfig = async (config) => {
  const firebaseToken = await auth.currentUser?.getIdToken();
  return {
    ...config,
    headers: {
      ...config.headers,
      "Content-Type": "application/json",
      Authorization: `Bearer ${firebaseToken}`,
    },
  };
};

const CommonApi = {
  get: async (url, config = {}) => {
    try {
      const response = await axios.get(
        `${BASE_URL}${url}`,
        await getConfig(config)
      );
      return response.data;
    } catch (error) {
      // throw error;
    }
  },

  post: async (url, data = {}, config = {}) => {
    try {
      const response = await axios.post(
        `${BASE_URL}${url}`,
        data,
        await getConfig(config)
      );
      return response.data;
    } catch (error) {
      // throw error;
    }
  },

  patch: async (url, data = {}, config = {}) => {
    try {
      const response = await axios.patch(
        `${BASE_URL}${url}`,
        data,
        await getConfig(config)
      );
      return response.data;
    } catch (error) {
      // throw error;
    }
  },

  delete: async (url, config = {}) => {
    try {
      const response = await axios.delete(
        `${BASE_URL}${url}`,
        await getConfig(config)
      );
      return response.data;
    } catch (error) {
      // throw error;
    }
  },

  put: async (url, data = {}, config = {}) => {
    try {
      const response = await axios.put(
        `${BASE_URL}${url}`,
        data,
        await getConfig(config)
      );
      return response.data;
    } catch (error) {
      // throw error;
    }
  },
};

export default CommonApi;

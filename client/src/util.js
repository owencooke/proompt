import axios from "axios";

const BASE_URL = "http://localhost:7890";
const BASE_CONFIG = {
  "Content-Type": "application/json",
};

const CommonApi = {
  get: async (url, config = {}) => {
    try {
      const response = await axios.get(`${BASE_URL}${url}`, {
        ...BASE_CONFIG,
        ...config,
      });
      return response.data;
    } catch (error) {
      // throw error;
    }
  },

  post: async (url, data = {}, config = {}) => {
    try {
      const response = await axios.post(`${BASE_URL}${url}`, data, {
        ...BASE_CONFIG,
        ...config,
      });
      return response.data;
    } catch (error) {
      // throw error;
    }
  },

  patch: async (url, data = {}, config = {}) => {
    try {
      const response = await axios.patch(`${BASE_URL}${url}`, data, {
        ...BASE_CONFIG,
        ...config,
      });
      return response.data;
    } catch (error) {
      // throw error;
    }
  },

  delete: async (url, config = {}) => {
    try {
      const response = await axios.delete(`${BASE_URL}${url}`, {
        ...BASE_CONFIG,
        ...config,
      });
      return response.data;
    } catch (error) {
      // throw error;
    }
  },

  put: async (url, data = {}, config = {}) => {
    try {
      const response = await axios.put(`${BASE_URL}${url}`, data, {
        ...BASE_CONFIG,
        ...config,
      });
      return response.data;
    } catch (error) {
      // throw error;
    }
  },
};

export default CommonApi;

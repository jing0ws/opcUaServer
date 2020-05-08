const axios = require('axios');

const api = axios.create({
  baseURL: 'http://mir.com/api/v2.0.0',
});

api.interceptors.request.use(async (config) => {
  if (token) {
    config.headers.authorization =
      'Basic RGlzdHJpYnV0b3I6NjJmMmYwZjFlZmYxMGQzMTUyYzk1ZjZmMDU5NjU3NmU0ODJiYjhlNDQ4MDY0MzNmNGNmOTI5NzkyODM0YjAxNA==';
  }
  return config;
});

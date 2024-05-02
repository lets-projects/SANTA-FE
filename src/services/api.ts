import axios from 'axios';
import { rejectIntercepter, requestIntercepter, responseIntercepter } from './Interceptor';

export const api = axios.create({
  baseURL: 'http://43.200.136.37:8080/api/',
  withCredentials: true,
});

api.interceptors.request.use(requestIntercepter);

api.interceptors.response.use(responseIntercepter, rejectIntercepter);

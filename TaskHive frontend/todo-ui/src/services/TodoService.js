import axios from "axios";
import { getToken } from "./AuthService";

const  REST_API_BASE_CALL= 'http://localhost:8080/api/todos';

axios.interceptors.request.use(function (config) {
    config.headers['Authorization'] = getToken();
    return config;
  }, function (error) {
    return Promise.reject(error);
  });

export const getAllTodos = () => axios.get(REST_API_BASE_CALL);
export const getTodo = (id) => axios.get(REST_API_BASE_CALL + '/' + id);
export const saveTodo = (todo) => axios.post(REST_API_BASE_CALL, todo);
export const updateTodo = (id, todo) => axios.put(REST_API_BASE_CALL + '/' + id, todo);
export const deleteTodo = (id) => axios.delete(REST_API_BASE_CALL + '/' + id);
export const completeTodo = (id) => axios.patch(REST_API_BASE_CALL + '/' + id + '/complete');
export const incompleteTodo = (id) => axios.patch(REST_API_BASE_CALL + '/' + id + '/incomplete');
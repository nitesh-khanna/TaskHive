import axios from "axios";

const  AUTH_REST_API_BASE_CALL= 'http://localhost:8080/api/auth';

// export const getAllTodos = () => axios.get(AUTH_REST_API_BASE_CALL);
export const registerUser = (userObj) => axios.post(AUTH_REST_API_BASE_CALL + '/register', userObj);

export const loginUser = (usernameOrEmail, password) => axios.post(AUTH_REST_API_BASE_CALL + '/login', {usernameOrEmail, password});

export const storeToken = (token) => localStorage.setItem("token", token);

export const getToken = () => localStorage.getItem("token");

export const saveLoggedInUser = (username, role) => {
    sessionStorage.setItem("authenticatedUser", username);
    sessionStorage.setItem("role", role);
}

export const isUserLoggedIn = () => {
    const username = sessionStorage.getItem("authenticatedUser");
    if(username == null) return false;
    else return true;
}

export const getLoggedInUser = () => {
    const username = sessionStorage.getItem("authenticatedUser");
    return username;
}

export const logout = () => {
    localStorage.clear();
    sessionStorage.clear();
}

export const isAdminUser = () => {
    let role = sessionStorage.getItem("role");
    if(role != null && role === 'ROLE_ADMIN') return true;
    else return false;
}

export const forgotPassword = (usernameOrEmail) => {
  return axios.post(AUTH_REST_API_BASE_CALL + '/forgot-password', {usernameOrEmail});
}

export const resetPassword = (token, newPassword) => axios.post(AUTH_REST_API_BASE_CALL + '/reset-password', {token, newPassword});
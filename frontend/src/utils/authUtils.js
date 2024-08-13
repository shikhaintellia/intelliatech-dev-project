// src/utils/authUtils.js

export const getAccessToken = () => localStorage.getItem('accessToken');

export const isAuthenticated = () => !!getAccessToken();

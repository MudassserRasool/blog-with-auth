'use client';

const token = localStorage.getItem('token');
export const isAuthenticated = token !== null ? true : false;

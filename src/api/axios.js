import axios from 'axios';
const BASE_URL = 'https://clones-api.onrender.com/api/';

export default axios.create({
    baseURL: BASE_URL,
    headers: {'tenantId': '0000'}
});

export const axiosPrivate = axios.create({
    baseURL: BASE_URL,
    headers: { 'Content-Type': 'application/json', 'tenantId': '0000' }
});
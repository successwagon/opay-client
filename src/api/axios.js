import axios from 'axios';
const BASE_URL = 'https://localhost:7126/api/';

export default axios.create({
    baseURL: BASE_URL,
    headers: {'tenantId': '0000'}
});

export const axiosPrivate = axios.create({
    baseURL: BASE_URL,
    headers: { 'Content-Type': 'application/json', 'tenantId': '0000' }
});
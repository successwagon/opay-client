import axios from 'axios';
const BASE_URL = 'https://localhost:7126/api/';

export default axios.create({
    baseURL: BASE_URL,
    headers: {'tenantId': 'dfff0134-23c9-4ee3-8e84-adae4a54cbe2'}
});

export const axiosPrivate = axios.create({
    baseURL: BASE_URL,
    headers: { 'Content-Type': 'application/json', 'tenantId': 'dfff0134-23c9-4ee3-8e84-adae4a54cbe2' }
});
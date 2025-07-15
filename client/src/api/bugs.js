import axios from 'axios';

const API_URL = '/api/bugs';
 
export const fetchBugs = () => axios.get(API_URL);
export const createBug = (bug) => axios.post(API_URL, bug);
export const updateBug = (id, updates) => axios.patch(`${API_URL}/${id}`, updates);
export const deleteBug = (id) => axios.delete(`${API_URL}/${id}`); 
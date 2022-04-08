import axios from 'axios';

const baseURL = 'http://127.0.0.1:4000';

const flaskApi = axios.create({ baseURL });

export default flaskApi;
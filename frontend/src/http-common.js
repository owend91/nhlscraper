import axios from 'axios'
require('dotenv').config();

export default axios.create({
    baseURL: process.env.REACT_APP_API_BASE,
    headers: {
        "Content-type": "application/json"
    }
});
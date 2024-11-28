import axios from 'axios';

const backendApiClient = axios.create({
  baseURL: "http://localhost:5002",
  headers: {
    Authorization: `Bearer ${process.env.BACKEND_AUTH_TOKEN}`,
    'Content-Type': 'application/json',
  },
});

export default backendApiClient;

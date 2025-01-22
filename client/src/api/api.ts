
import axios from "axios";

const API_URL = "https://daiilystreaktracker.onrender.com/api/v1";

export const api = axios.create({
      baseURL: API_URL
    });

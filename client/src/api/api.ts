
import axios from "axios";

const API_URL = "http://localhost:4000/api/v1";

export const api = axios.create({
      baseURL: API_URL
    });

// export const fetchContributionData = async (username: string): Promise<any> => {
//   const response = await baseUrl.get(`/streak?username=${username}`);
//   return response.data;
// }

// export const calculateStreak = async (contributionDays: any): Promise<number> => {
//   const response = await baseUrl.get(`/streak?username=${contributionDays.username}`);
//   return response.data.streak;
// }



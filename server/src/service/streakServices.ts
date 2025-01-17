import axios from 'axios';
import { GITHUB_API_URL, GITHUB_TOKEN } from '../config/streakConf';

interface ContributionDay {
   date: string;
   contributionCount: number;
}

export const fetchContributionData = async (username: string): Promise<ContributionDay[]> => {
  const query = `
    {
      user(login: "${username}") {
        contributionsCollection {
          contributionCalendar {
            weeks {
              contributionDays {
                date
                contributionCount
              }
            }
          }
        }
      }
    }  
  `;

  try {
    const response = await axios.post(
      GITHUB_API_URL,
      { query },
      { headers: { Authorization: `Bearer ${GITHUB_TOKEN}` } }
    );

    // Log the entire GitHub response for debugging
    console.log("GitHub Response:", JSON.stringify(response.data, null, 2));

    const user = response.data.data.user;

    // Handle invalid username or missing contributions data
    if (!user || !user.contributionsCollection) {
      throw new Error("Invalid username or missing contributions data.");
    }

    return user.contributionsCollection.contributionCalendar.weeks
      .flatMap((week: any) => week.contributionDays)
      .reverse(); // Reverse to start from the latest date
  } catch (error: any) {
    console.error("Error fetching data:", error.message);
    throw new Error("Failed to fetch contribution data from GitHub.");
  }
};


export const calculateContributionStreak = (contriutionDays : ContributionDay[]) => {
          
         let streak = 0;

         for(const day of contriutionDays){
            if(day.contributionCount > 0){
                streak++;
            }else{
                break;
            }
         }

         return streak;
}



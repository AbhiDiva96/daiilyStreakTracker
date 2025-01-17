import axios from 'axios';
import { GITHUB_API_URL, GITHUB_TOKEN } from '../config/streakConf';

interface ContributionDay {
    date: string;
    contributionCount: number;
}

//here we will write all the business logic\

export const fetchContributionStreak = async (userName: string) => {
    

  const query = `{
     user(login: "${userName}"){
        contributionsCollection{
          contributionCalendar{
            weeks{
              contributionDays{
                 date
                 contributionCount 
              }
            }
          }
        }
     }
  }`;

  try{
       const res = await axios.post(
          GITHUB_API_URL,
          {query: query},
          {
            headers: {
                Authorization: `bearer ${GITHUB_TOKEN}`,
            }
          }
       )

       //GET THE CONTRIBUTION STREAK
       const contributionStreak = res.data.data.user.contributionsCollection.contributionCalendar.weeks.weeks.flatMap((week: any) => week.contributionDays)
       .reverse()

       return contributionStreak;

  }catch(err){
     console.log(err);
     throw new Error("Fetching contribution Streak is failed");
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



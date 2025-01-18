import axios from "axios";
import { GITHUB_API_URL, GITHUB_TOKEN } from "../config/streakConf";

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

    const contributionDays: ContributionDay[] = response.data.data.user.contributionsCollection.contributionCalendar.weeks
      .flatMap((week: any) => week.contributionDays)
      .reverse(); // Reverse to start from the latest date

    return contributionDays;
  } catch (error) {
    throw new Error("Failed to fetch contribution data from GitHub.");
  }
};

export const calculateStreak = (contributionDays: ContributionDay[]): number => {
  let streak = 0;

  for (const day of contributionDays) {
    if (day.contributionCount > 0) {
      streak++;
    } else {
      break; // Streak ends on the first day without contributions
    }
  }

  return streak;
};

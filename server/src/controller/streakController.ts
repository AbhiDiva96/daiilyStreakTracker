import { Request, Response } from "express";
import { calculateStreak, fetchContributionData } from "../service/streakServices";

export const getStreak = async (req: Request, res: Response): Promise<void> => {
  const { username } = req.query;

  if (!username || typeof username !== "string") {
    res.status(400).json({ error: "Username is required and must be a string." });
    return;
  }

  try {
    const contributionDays = await fetchContributionData(username);
    const streak = calculateStreak(contributionDays);

    res.status(200).json({ 
      username, 
      streak,
       contributionDays
   });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

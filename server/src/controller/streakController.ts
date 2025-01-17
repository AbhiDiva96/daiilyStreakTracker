import { calculateContributionStreak, fetchContributionData } from "../service/streakServices";

export const getStreak = async (req: any, res: any) => {
   const userName = req.query.userName; // Access userName from query parameters

   // Check if username is provided
   if (!userName) {
      return res.status(400).json({
         message: "Please provide a username."
      });
   }

   try {
      // Fetch contribution data for the user
      const contributionStreak = await fetchContributionData(userName);
      const streak = calculateContributionStreak(contributionStreak);

      // Return the success response with the streak data
      res.status(200).json({
         message: 'Success',
         userName,
         streak
      });

   } catch (err) {
      console.error("Error fetching streak:"); // Log the error for debugging
      res.status(500).json({
         message: 'Something went wrong while fetching the contribution data.',
      });
   }
}

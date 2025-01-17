import { calculateContributionStreak, fetchContributionStreak } from "../service/streakServices";

export const getStreak = async (req: any, res: any) => {

   const userName = req.query;

   if(!userName){
        res.status(400).res.json({
            message: "please provide username"
        })
        return;
   }


   try{
           const contributionStreak = await fetchContributionStreak(userName);
           const streak = calculateContributionStreak(contributionStreak);

           res.status(200).json({
              message: 'success',
               userName,
                streak
           })

   }catch(err){
      res.status(500).json({
          message: 'something went wrong'
      })
      return;
   }
      
}
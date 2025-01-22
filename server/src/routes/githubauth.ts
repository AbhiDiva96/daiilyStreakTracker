
import axios from 'axios';
import express from 'express';

export const githubRouter = express.Router();

githubRouter.post('/oauth/token', async (req, res) => {
        const {code}  = req.query;

        try{
              const response = await axios.post('https://github.com/login/oauth/access_token',
                {
                    client_id: process.env.CLIENT_ID,
                    client_secret: process.env.CLIENT_SECRET,
                    code: code
                },
                {
                    headers: {
                        Accept: 'application/json',
                    },
                }
            );
          
             const { access_token } = response.data;
              res.json({ 
                access_token 
            });
        }catch(error){
            res.status(500).json({
                messge: 'some this error'
            });
        }
});



githubRouter.get('/contributions', async (req: any, res: any) => {
 
  const { accessToken } = req.query;

  if (!accessToken) {
    return res.status(400).json({ error: 'Access token is required' });
  }

  try {
    const userResponse = await axios.get('https://api.github.com/user', {
      headers: { Authorization: `Bearer ${accessToken}` },
    });

    const username = userResponse.data.login;

    const eventsResponse = await axios.get(`https://api.github.com/users/${username}/events`);
    const contributionDays = eventsResponse.data.map((event: any) => ({
      date: event.created_at.split('T')[0],
      contributionCount: 1,
    }));

    res.json({ contributionDays });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch GitHub contributions' });
  }
});
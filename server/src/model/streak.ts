
import express from 'express';
export const streakRouter = express.Router();

const githubURL = `https://api.github.com/user`;
streakRouter.get('/streak', (req, res) => {
    res.send('streak api');
})
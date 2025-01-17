
import express from 'express';
import { getStreak } from '../controller/streakController';
export const streakRouter = express.Router();


streakRouter.get('/streak', getStreak);
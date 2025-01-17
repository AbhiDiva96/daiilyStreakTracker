"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.calculateContributionStreak = exports.fetchContributionStreak = void 0;
const axios_1 = __importDefault(require("axios"));
const streakConf_1 = require("../config/streakConf");
//here we will write all the business logic\
const fetchContributionStreak = (userName) => __awaiter(void 0, void 0, void 0, function* () {
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
    try {
        const res = yield axios_1.default.post(streakConf_1.GITHUB_API_URL, { query: query }, {
            headers: {
                Authorization: `bearer ${streakConf_1.GITHUB_TOKEN}`,
            }
        });
        //GET THE CONTRIBUTION STREAK
        const contributionStreak = res.data.data.user.contributionsCollection.contributionCalendar.weeks.weeks.flatMap((week) => week.contributionDays)
            .reverse();
        return contributionStreak;
    }
    catch (err) {
        console.log(err);
        throw new Error("Fetching contribution Streak is failed");
    }
});
exports.fetchContributionStreak = fetchContributionStreak;
const calculateContributionStreak = (contriutionDays) => {
    let streak = 0;
    for (const day of contriutionDays) {
        if (day.contributionCount > 0) {
            streak++;
        }
        else {
            break;
        }
    }
    return streak;
};
exports.calculateContributionStreak = calculateContributionStreak;

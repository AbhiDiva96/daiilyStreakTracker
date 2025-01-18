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
exports.calculateStreak = exports.fetchContributionData = void 0;
const axios_1 = __importDefault(require("axios"));
const streakConf_1 = require("../config/streakConf");
const fetchContributionData = (username) => __awaiter(void 0, void 0, void 0, function* () {
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
        const response = yield axios_1.default.post(streakConf_1.GITHUB_API_URL, { query }, { headers: { Authorization: `Bearer ${streakConf_1.GITHUB_TOKEN}` } });
        const contributionDays = response.data.data.user.contributionsCollection.contributionCalendar.weeks
            .flatMap((week) => week.contributionDays)
            .reverse(); // Reverse to start from the latest date
        return contributionDays;
    }
    catch (error) {
        throw new Error("Failed to fetch contribution data from GitHub.");
    }
});
exports.fetchContributionData = fetchContributionData;
const calculateStreak = (contributionDays) => {
    let streak = 0;
    for (const day of contributionDays) {
        if (day.contributionCount > 0) {
            streak++;
        }
        else {
            break; // Streak ends on the first day without contributions
        }
    }
    return streak;
};
exports.calculateStreak = calculateStreak;

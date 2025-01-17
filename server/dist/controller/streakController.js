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
Object.defineProperty(exports, "__esModule", { value: true });
exports.getStreak = void 0;
const streakServices_1 = require("../service/streakServices");
const getStreak = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userName = req.query.userName; // Access userName from query parameters
    // Check if username is provided
    if (!userName) {
        return res.status(400).json({
            message: "Please provide a username."
        });
    }
    try {
        // Fetch contribution data for the user
        const contributionStreak = yield (0, streakServices_1.fetchContributionData)(userName);
        const streak = (0, streakServices_1.calculateContributionStreak)(contributionStreak);
        // Return the success response with the streak data
        res.status(200).json({
            message: 'Success',
            userName,
            streak
        });
    }
    catch (err) {
        console.error("Error fetching streak:"); // Log the error for debugging
        res.status(500).json({
            message: 'Something went wrong while fetching the contribution data.',
        });
    }
});
exports.getStreak = getStreak;

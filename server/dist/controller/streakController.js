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
    const { username } = req.query;
    if (!username || typeof username !== "string") {
        res.status(400).json({ error: "Username is required and must be a string." });
        return;
    }
    try {
        const contributionDays = yield (0, streakServices_1.fetchContributionData)(username);
        const streak = (0, streakServices_1.calculateStreak)(contributionDays);
        res.status(200).json({
            username,
            streak,
            contributionDays
        });
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
});
exports.getStreak = getStreak;

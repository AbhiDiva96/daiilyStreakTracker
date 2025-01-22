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
exports.githubRouter = void 0;
const axios_1 = __importDefault(require("axios"));
const express_1 = __importDefault(require("express"));
exports.githubRouter = express_1.default.Router();
exports.githubRouter.post('/oauth/token', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { code } = req.query;
    try {
        const response = yield axios_1.default.post('https://github.com/login/oauth/access_token', {
            client_id: process.env.CLIENT_ID,
            client_secret: process.env.CLIENT_SECRET,
            code: code
        }, {
            headers: {
                Accept: 'application/json',
            },
        });
        const { access_token } = response.data;
        res.json({
            access_token
        });
    }
    catch (error) {
        res.status(500).json({
            messge: 'some this error'
        });
    }
}));
exports.githubRouter.get('/contributions', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { accessToken } = req.query;
    if (!accessToken) {
        return res.status(400).json({ error: 'Access token is required' });
    }
    try {
        const userResponse = yield axios_1.default.get('https://api.github.com/user', {
            headers: { Authorization: `Bearer ${accessToken}` },
        });
        const username = userResponse.data.login;
        const eventsResponse = yield axios_1.default.get(`https://api.github.com/users/${username}/events`);
        const contributionDays = eventsResponse.data.map((event) => ({
            date: event.created_at.split('T')[0],
            contributionCount: 1,
        }));
        res.json({ contributionDays });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to fetch GitHub contributions' });
    }
}));

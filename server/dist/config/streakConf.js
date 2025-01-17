"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GITHUB_TOKEN = exports.GITHUB_API_URL = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
exports.GITHUB_API_URL = "https://api.github.com/graphql";
exports.GITHUB_TOKEN = process.env.GITHUB_TOKEN || "";


import dotenv from "dotenv";

dotenv.config();

export const GITHUB_API_URL = "https://api.github.com/graphql";
export const GITHUB_TOKEN = process.env.GITHUB_TOKEN || "";

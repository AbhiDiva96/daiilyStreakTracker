"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const streak_1 = require("./routes/streak");
const githubauth_1 = require("./routes/githubauth");
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use((0, cors_1.default)());
const PORT = 4000;
app.use('/api/v1', streak_1.streakRouter);
app.use('/api/v1', githubauth_1.githubRouter);
app.listen(PORT, () => {
    console.log(`listening on *: ${PORT}`);
});

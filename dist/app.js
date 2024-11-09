"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = void 0;
const express_1 = __importDefault(require("express"));
const setting_1 = require("./setting");
const videos_router_1 = require("./routes/videos-router");
exports.app = (0, express_1.default)();
exports.app.use(express_1.default.json());
exports.app.use(setting_1.SETTINGS.PATH.VIDEOS, videos_router_1.videosRouter);

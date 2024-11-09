import express from 'express'
import {SETTINGS} from "./setting";
import {videosRouter} from "./routes/videos-router";

export const app = express()

app.use(express.json())

app.use(SETTINGS.PATH.VIDEOS, videosRouter);
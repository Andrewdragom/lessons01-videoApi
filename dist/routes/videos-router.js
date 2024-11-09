"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.videosRouter = void 0;
const express_1 = require("express");
const db_1 = require("../db/db");
const createVideo_1 = require("../controllers/createVideo");
const updateVideo_1 = require("../controllers/updateVideo");
exports.videosRouter = (0, express_1.Router)();
exports.videosRouter.get('/', (req, res) => {
    res.status(200).json(db_1.db.videos);
});
exports.videosRouter.get("/:id", (req, res) => {
    const videoId = +req.params.id;
    const getVideo = db_1.db.videos.find(video => video.id === videoId);
    if (!getVideo) {
        res.status(404).send();
    }
    res.status(200).json(getVideo);
});
exports.videosRouter.delete('/:id', (req, res) => {
    for (let i = 0; i < db_1.db.videos.length; i++) {
        if (db_1.db.videos[i].id === +req.params.id) {
            db_1.db.videos.splice(i, 1);
            res.send(204);
            return;
        }
    }
    res.send(404);
}); // удалить видео по айди
exports.videosRouter.post('/', createVideo_1.createVideo); // создать новое видео
exports.videosRouter.put('/:id', updateVideo_1.updateVideo); // обновить видео по айди
exports.videosRouter.delete('/__test__/data', (req, res) => {
    db_1.db.videos.length = 0;
    res.status(204).send(db_1.db.videos);
}); // для тестов

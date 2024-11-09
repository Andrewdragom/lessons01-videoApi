"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.videosRouter = void 0;
const express_1 = require("express");
const db_1 = require("../db/db");
exports.videosRouter = (0, express_1.Router)();
exports.videosRouter.get("/:id", (req, res) => {
    const productName = db_1.videos.find(p => p.id === +req.params.id);
    if (!productName) {
        res.status(404);
    }
    res.json(productName);
}); // получить продукты по айди(если нету айди в ури параметрах то все продукты)
exports.videosRouter.get('/', (req, res) => {
    let foundProduct = db_1.videos;
    if (req.query.title) {
        foundProduct = db_1.videos.filter(p => p.title.indexOf(req.query.title) > -1);
    }
    res.status(200).json(foundProduct);
}); // получить продукты по куэри параметрам или все если нету параметров
exports.videosRouter.delete('/:id', (req, res) => {
    for (let i = 0; i < db_1.videos.length; i++) {
        if (db_1.videos[i].id === +req.params.id) {
            db_1.videos.splice(i, 1);
            res.send(204);
            return;
        }
    }
    res.send(404);
}); // удалить продукт по айди
exports.videosRouter.post('/', (req, res) => {
    let newProduct = {
        id: +(new Date()),
        title: req.body.title,
        author: req.body.author,
        canBeDownloaded: true,
        minAgeRestriction: null,
        createdAt: "2024-11-06T09:23:10.622Z",
        publicationDate: "2024-11-06T09:23:10.622Z",
        availableResolutions: [
            db_1.availableResolutions.P144
        ]
    };
    if (newProduct.title && newProduct.title.length > 0 && newProduct.title.length < 10 && typeof (newProduct.title) === "string") {
        db_1.videos.push(newProduct);
        res.status(201).send(newProduct);
    }
    else {
        res.status(400).send('Bad request');
    }
}); // создать новый продукт
exports.videosRouter.put('/:id', (req, res) => {
    let productName = db_1.videos.find(p => p.id === +req.params.id);
    if (!productName) {
        res.status(404);
    }
    else {
        if (req.body.title && req.body.title.length > 0 && typeof (req.body.title) === "string" && req.body.title.length < 10) {
            productName.title = req.body.title;
        }
        else {
            res.status(400).send('Bad request');
        }
    }
    res.status(201).send(productName);
}); // обновить продукт по айди
// productsRouter.delete('/__test__/data', (req: Request, res: Response) => {
//     products = [];
//     res.sendStatus(204)
// })

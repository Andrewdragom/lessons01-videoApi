import request from 'supertest';
import {SETTINGS} from "../../setting";
import {app} from "../../app";
import {videoTestManager} from "./utils/testManager";
import {db} from "../../db/db";


describe(SETTINGS.PATH.VIDEOS, () => {

    beforeAll(async () => {
        await request(app).delete(SETTINGS.PATH.VIDEOS+ '/__test__/data');
    }) // подготовка файлов к тестам(очситка бд)


    it('should return 200 and array', async () => {
       await request(app).get(SETTINGS.PATH.VIDEOS).expect(200, []);
    })

    it('should return 404 for not existing course', async () => {
        await request(app).get(SETTINGS.PATH.VIDEOS+21).expect(404);
    })

    it('should not create product with incorrect data', async () => {
        await request(app).post(SETTINGS.PATH.VIDEOS).send({title: ""}).expect(400)
        await request(app).get(SETTINGS.PATH.VIDEOS).expect(200, [])
    })

    let createdProduct: any = null;
    it('should create product', async () => {

        const data = {title: "new video",author:"Bob",availableResolutions:["P240"]}

        const createResponse = await videoTestManager.createVideoTest(data)

        createdProduct = createResponse.body

        expect(createdProduct).toEqual({
            id: expect.any(Number),
            title: "new video",
            author:"Bob",
            availableResolutions:["P240"],
            canBeDownloaded: expect.any(Boolean),
            createdAt: expect.any(String),
            publicationDate: expect.any(String),
            minAgeRestriction: null,
        })
        await request(app).get(SETTINGS.PATH.VIDEOS).expect(200, [createdProduct])
    })

    it('should not update with incorrect data', async () => {
        const data = {title: "new video",author:"Bob",availableResolutions:["P240"]}
        const createResponse = await videoTestManager.createVideoTest(data)
        db.videos.push(createResponse.body)
        await request(app).put(SETTINGS.PATH.VIDEOS + "/" + createResponse.body.id)
            .send({title: ""})
            .expect(400)
    })

    it('should delete video', async () => {
        const data = {title: "new video",author:"Bob",availableResolutions:["P240"]}
        const createResponse = await videoTestManager.createVideoTest(data)
        db.videos.push(createResponse.body)
        await request(app).delete(SETTINGS.PATH.VIDEOS + "/" + createResponse.body.id)
            .expect(204)
    })

    it('should update with correct data', async () => {
        const data = {title: "new video",author:"Bob",availableResolutions:["P240"]}
        const createResponse = await videoTestManager.createVideoTest(data)
        db.videos.push(createResponse.body)
        await request(app).put(SETTINGS.PATH.VIDEOS + "/" +createResponse.body.id)
            .send({title: "old video",author: "nik",availableResolutions:["P360"]})
            .expect(201)
    })



})
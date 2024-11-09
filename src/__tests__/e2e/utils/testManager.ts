import request from "supertest";
import {app} from "../../../app";
import {SETTINGS} from "../../../setting";

export const videoTestManager = {
    async createVideoTest(data: any) {
        const response = await request(app).post(SETTINGS.PATH.VIDEOS)
            .send(data)
            .expect(201)
        return response;
    }
}
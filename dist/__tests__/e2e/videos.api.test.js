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
const supertest_1 = __importDefault(require("supertest"));
const setting_1 = require("../../setting");
const app_1 = require("../../app");
const testManager_1 = require("./utils/testManager");
const db_1 = require("../../db/db");
describe(setting_1.SETTINGS.PATH.VIDEOS, () => {
    beforeAll(() => __awaiter(void 0, void 0, void 0, function* () {
        yield (0, supertest_1.default)(app_1.app).delete(setting_1.SETTINGS.PATH.VIDEOS + '/__test__/data');
    })); // подготовка файлов к тестам(очситка бд)
    it('should return 200 and array', () => __awaiter(void 0, void 0, void 0, function* () {
        yield (0, supertest_1.default)(app_1.app).get(setting_1.SETTINGS.PATH.VIDEOS).expect(200, []);
    }));
    it('should return 404 for not existing course', () => __awaiter(void 0, void 0, void 0, function* () {
        yield (0, supertest_1.default)(app_1.app).get(setting_1.SETTINGS.PATH.VIDEOS + 21).expect(404);
    }));
    it('should not create product with incorrect data', () => __awaiter(void 0, void 0, void 0, function* () {
        yield (0, supertest_1.default)(app_1.app).post(setting_1.SETTINGS.PATH.VIDEOS).send({ title: "" }).expect(400);
        yield (0, supertest_1.default)(app_1.app).get(setting_1.SETTINGS.PATH.VIDEOS).expect(200, []);
    }));
    let createdProduct = null;
    it('should create product', () => __awaiter(void 0, void 0, void 0, function* () {
        const data = { title: "new video", author: "Bob", availableResolutions: ["P240"] };
        const createResponse = yield testManager_1.videoTestManager.createVideoTest(data);
        createdProduct = createResponse.body;
        expect(createdProduct).toEqual({
            id: expect.any(Number),
            title: "new video",
            author: "Bob",
            availableResolutions: ["P240"],
            canBeDownloaded: expect.any(Boolean),
            createdAt: expect.any(String),
            publicationDate: expect.any(String),
            minAgeRestriction: null,
        });
        yield (0, supertest_1.default)(app_1.app).get(setting_1.SETTINGS.PATH.VIDEOS).expect(200, [createdProduct]);
    }));
    it('should not update with incorrect data', () => __awaiter(void 0, void 0, void 0, function* () {
        const data = { title: "new video", author: "Bob", availableResolutions: ["P240"] };
        const createResponse = yield testManager_1.videoTestManager.createVideoTest(data);
        db_1.db.videos.push(createResponse.body);
        yield (0, supertest_1.default)(app_1.app).put(setting_1.SETTINGS.PATH.VIDEOS + "/" + createResponse.body.id)
            .send({ title: "" })
            .expect(400);
    }));
    it('should delete video', () => __awaiter(void 0, void 0, void 0, function* () {
        const data = { title: "new video", author: "Bob", availableResolutions: ["P240"] };
        const createResponse = yield testManager_1.videoTestManager.createVideoTest(data);
        db_1.db.videos.push(createResponse.body);
        yield (0, supertest_1.default)(app_1.app).delete(setting_1.SETTINGS.PATH.VIDEOS + "/" + createResponse.body.id)
            .expect(204);
    }));
    it('should update with correct data', () => __awaiter(void 0, void 0, void 0, function* () {
        const data = { title: "new video", author: "Bob", availableResolutions: ["P240"] };
        const createResponse = yield testManager_1.videoTestManager.createVideoTest(data);
        db_1.db.videos.push(createResponse.body);
        yield (0, supertest_1.default)(app_1.app).put(setting_1.SETTINGS.PATH.VIDEOS + "/" + createResponse.body.id)
            .send({ title: "old video", author: "nik", availableResolutions: ["P360"] })
            .expect(201);
    }));
});

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
describe('/videos', () => {
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
        const createResponse = yield (0, supertest_1.default)(app_1.app).post(setting_1.SETTINGS.PATH.VIDEOS)
            .send({ title: "banana" })
            .expect(201);
        createdProduct = createResponse.body;
        expect(createdProduct).toEqual({
            id: expect.any(Number),
            title: "banana",
        });
        yield (0, supertest_1.default)(app_1.app).get(setting_1.SETTINGS.PATH.VIDEOS).expect(200, [createdProduct]);
    }));
    it('should not update with incorrect data', () => __awaiter(void 0, void 0, void 0, function* () {
        yield (0, supertest_1.default)(app_1.app).put(setting_1.SETTINGS.PATH.VIDEOS + createdProduct.id)
            .send({ title: "" })
            .expect(400);
        yield (0, supertest_1.default)(app_1.app).get(setting_1.SETTINGS.PATH.VIDEOS + createdProduct.id).expect(200, createdProduct);
    }));
});

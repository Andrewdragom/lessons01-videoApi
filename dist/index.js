"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const setting_1 = require("./setting");
const app_1 = require("./app");
app_1.app.listen(setting_1.SETTINGS.PORT, () => {
    console.log(`Example app listening on port ${setting_1.SETTINGS.PORT}`);
});

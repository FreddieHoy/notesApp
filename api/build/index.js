"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = void 0;
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const Router_1 = require("./src/Routing/Router");
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const dotenv_1 = __importDefault(require("dotenv"));
const cors_1 = __importDefault(require("cors"));
const port = 8000;
dotenv_1.default.config();
exports.app = (0, express_1.default)();
exports.app.use(body_parser_1.default.json());
exports.app.use(body_parser_1.default.urlencoded({
    extended: true,
}));
exports.app.use((0, cookie_parser_1.default)());
exports.app.use((0, cors_1.default)({
    origin: "http://localhost:3000",
    credentials: true,
}));
exports.app.get("/", (_request, response) => {
    response.json({ info: "Node.js, Express, and Postgres API" });
});
exports.app.use(Router_1.router);
exports.app.listen(port, () => {
    console.log(`API now running on port ${port}.`);
});

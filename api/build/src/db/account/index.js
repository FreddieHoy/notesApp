"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const get_1 = __importDefault(require("./get"));
const getByEmail_1 = __importDefault(require("./getByEmail"));
exports.default = { get: get_1.default, getByEmail: getByEmail_1.default };

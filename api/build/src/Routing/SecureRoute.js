"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.secureRoute = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dbPool_1 = require("../../dbPool");
const secureRoute = (request, response, next) => {
    if (!request.cookies.authToken) {
        return response.sendStatus(401);
    }
    const token = request.cookies.authToken;
    jsonwebtoken_1.default.verify(token, dbPool_1.secret, (err, payload) => {
        if (err) {
            return response.sendStatus(401);
        }
        if (!payload)
            throw new Error("No payload on request");
        if (token && isJWTPayload(payload)) {
            dbPool_1.pool.query("SELECT * FROM account.accounts WHERE token = $1", [token], (error, results) => {
                if (error) {
                    throw error;
                }
                const account = results.rows[0];
                if (!account)
                    return response.sendStatus(401);
                request.user = payload;
                next();
            });
        }
        else {
            response.sendStatus(404).json("No account found please login again");
        }
    });
};
exports.secureRoute = secureRoute;
const isJWTPayload = (payload) => {
    return typeof payload === "object";
};

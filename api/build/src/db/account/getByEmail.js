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
Object.defineProperty(exports, "__esModule", { value: true });
const dbPool_1 = require("../../../dbPool");
const get = ({ email }) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const results = yield dbPool_1.pool.query("SELECT * FROM account.accounts WHERE email = $1", [email]);
        const account = results.rows[0];
        if (!account) {
            throw new Error("Account not found");
        }
        return account;
    }
    catch (e) {
        throw new Error("Failed to find Account");
    }
});
exports.default = get;
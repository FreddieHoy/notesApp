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
exports.register = exports.logOut = exports.logIn = exports.getMe = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const dbPool_1 = require("../../dbPool");
const db_1 = __importDefault(require("../db"));
const getMe = (request, response) => {
    const token = request.cookies.authToken;
    dbPool_1.pool.query("SELECT * FROM account.accounts WHERE token = $1", [token], (error, results) => {
        if (error) {
            throw error;
        }
        response.status(200).json(results.rows);
    });
};
exports.getMe = getMe;
const logIn = (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = request.body;
    try {
        const account = yield db_1.default.account.getByEmail(email);
        const { password: hashedPassword } = account;
        bcryptjs_1.default.compare(password, hashedPassword, function (err, result) {
            if (err) {
                response.status(500).json({
                    message: "Error from bycrpt compare: " + err.message,
                });
                response.end();
                return;
            }
            if (!result) {
                response.status(500).json({
                    message: "Incorrect password",
                });
                response.end();
                return;
            }
            else {
                const token = jsonwebtoken_1.default.sign({ sub: account.id }, dbPool_1.secret, {
                    expiresIn: "6h",
                });
                response.cookie("authToken", token, { httpOnly: true });
                response.json({
                    message: `Welcome back ${account.name}! (With Cookie)`,
                    account,
                });
                dbPool_1.pool.query("UPDATE account SET token = $1 WHERE email = $2", [token, email], (error) => {
                    if (error) {
                        response.status(500).json({
                            message: "error from db query:  " + error.message,
                        });
                        response.end();
                        return;
                    }
                });
            }
        });
    }
    catch (e) {
        throw e;
    }
});
exports.logIn = logIn;
const logOut = (request, response) => {
    const userId = request.body.userId;
    if (!userId) {
        throw new Error("No user id found");
    }
    dbPool_1.pool.query("UPDATE account SET token = NULL WHERE id = $1", [userId], (error, res) => {
        if (error) {
            throw new Error("logout error: " + error.message);
        }
        response.status(200).clearCookie("authToken").send("Successfully logged out");
    });
};
exports.logOut = logOut;
const register = (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, email, password, confirmPassword } = request.body;
    if (!name || !email || !password || !confirmPassword) {
        throw new Error("Please enter all fields");
    }
    if (password !== confirmPassword) {
        throw new Error("Password confirmation not matching");
    }
    const hashedPassword = yield bcryptjs_1.default.hash(password, 10);
    dbPool_1.pool.query(`SELECT * FROM account.accounts WHERE email = $1`, [email], (err, results) => {
        if (err) {
            throw new Error("error trying to register: " + err.message);
        }
        if (results.rows.length > 0) {
            throw new Error("Email already registered");
        }
        else {
            dbPool_1.pool.query("INSERT INTO account (name, email, password) VALUES ($1, $2, $3) RETURNING *", [name, email, hashedPassword], (error, result) => {
                if (error) {
                    throw new Error("error from reg db:" + error.message);
                }
                // should have safer type checking..
                const newUserId = result.rows[0].id;
                response.status(201).send(`User added with ID: ${newUserId !== null && newUserId !== void 0 ? newUserId : "unknown"}`);
            });
        }
    });
});
exports.register = register;

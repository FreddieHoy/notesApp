"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteNote = exports.editNote = exports.createNote = exports.getNote = exports.getNotes = void 0;
const dbPool_1 = require("../../dbPool");
const getNotes = (request, response) => {
    var _a;
    const userId = (_a = request.user) === null || _a === void 0 ? void 0 : _a.sub;
    dbPool_1.pool.query("SELECT * FROM note.notes WHERE userId = $1 ORDER BY id ASC", [userId], (error, results) => {
        if (error) {
            throw error;
        }
        response.status(200).json(results.rows);
    });
};
exports.getNotes = getNotes;
const getNote = (request, response) => {
    var _a;
    const { id } = request.params;
    const userId = (_a = request.user) === null || _a === void 0 ? void 0 : _a.sub;
    dbPool_1.pool.query("SELECT * FROM note.notes WHERE userId = $1, id = $2 ORDER BY id ASC", [userId, id], (error, results) => {
        if (error) {
            throw error;
        }
        response.status(200).json(results.rows);
    });
};
exports.getNote = getNote;
// TODO Change to use token and not user id
// const token = request.cookies.authToken;
const createNote = (request, response) => {
    var _a;
    const { heading, content, todoitem, checked } = request.body;
    const userId = (_a = request.user) === null || _a === void 0 ? void 0 : _a.sub;
    dbPool_1.pool.query("INSERT INTO notes (userId, heading, content, todoitem, checked) VALUES ($1, $2, $3, $4, $5) RETURNING *", [userId, heading, content, todoitem, checked], (error, results) => {
        if (error) {
            throw error;
        }
        response.status(200).json(results.rows);
    });
};
exports.createNote = createNote;
const editNote = (request, response) => {
    const { heading, content, todoitem, checked } = request.body;
    const id = request.params.id;
    dbPool_1.pool.query(`UPDATE notes SET  
      heading = $1,
      content = $2,
      todoitem = $3,
      checked = $4
      WHERE id = $5 
      RETURNING *
    `, [heading, content, todoitem, checked, id], (error, results) => {
        if (error) {
            throw error;
        }
        response.status(200).json(results.rows);
    });
};
exports.editNote = editNote;
const deleteNote = (request, response) => {
    const id = request.params.id;
    dbPool_1.pool.query(`DELETE FROM note.notes 
      WHERE id = $1
    `, [id], (error, results) => {
        if (error) {
            throw error;
        }
        response.status(200);
        response.end();
    });
};
exports.deleteNote = deleteNote;

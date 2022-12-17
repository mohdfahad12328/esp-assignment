"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mysql_1 = __importDefault(require("mysql"));
const yargs_1 = __importDefault(require("yargs/yargs"));
const argv = (0, yargs_1.default)(process.argv).options({
    date: { type: "string" },
    slot: { type: "string" },
}).parseSync();
let conn = mysql_1.default.createConnection({
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: '',
    database: 'lab'
});
let q = `delete from record where loggedIn=0 and date='${argv.date}' and slot=${argv.slot}`;
conn.query(q, (err, results, fields) => {
    if (err)
        throw err;
    console.log(results.affectedRows > 0 ? `deleted ${results.affectedRows} row` : 'didnt found row to delete');
    return;
});
conn.end();

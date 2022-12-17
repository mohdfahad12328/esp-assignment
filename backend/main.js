"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mysql_1 = __importDefault(require("mysql"));
const cors_1 = __importDefault(require("cors"));
const body_parser_1 = __importDefault(require("body-parser"));
const app = (0, express_1.default)();
const port = 8000;
app.use((0, cors_1.default)({
    origin: ["http://localhost:5173", "http://localhost:4173"]
}));
app.use(body_parser_1.default.json());
app.use(body_parser_1.default.urlencoded({ extended: true }));
let queryRes;
app.get("/getSlotData", (req, res) => {
    let conn = mysql_1.default.createConnection({
        host: 'localhost',
        port: 3306,
        user: 'root',
        password: '',
        database: 'lab'
    });
    let q = `select * from record where date='${req.query.date}' and slot=${req.query.slot} order by seat asc`;
    conn.connect((err) => {
        if (err)
            console.log(err.code);
    });
    conn.query(q, (err, results, fields) => {
        if (err)
            throw err;
        else {
            queryRes = results.slice();
            let seats = [
                { id: 1, isTaken: false, isLoggedIn: false },
                { id: 2, isTaken: false, isLoggedIn: false },
                { id: 3, isTaken: false, isLoggedIn: false },
                { id: 4, isTaken: false, isLoggedIn: false },
                { id: 5, isTaken: false, isLoggedIn: false },
                { id: 6, isTaken: false, isLoggedIn: false },
                { id: 7, isTaken: false, isLoggedIn: false },
                { id: 8, isTaken: false, isLoggedIn: false },
                { id: 9, isTaken: false, isLoggedIn: false },
                { id: 10, isTaken: false, isLoggedIn: false },
                { id: 11, isTaken: false, isLoggedIn: false },
                { id: 12, isTaken: false, isLoggedIn: false },
                { id: 13, isTaken: false, isLoggedIn: false },
                { id: 14, isTaken: false, isLoggedIn: false },
                { id: 15, isTaken: false, isLoggedIn: false },
            ];
            let taken = [];
            let n = 15;
            for (let i = 0; i < queryRes.length; i++) {
                seats[queryRes[i].seat - 1].isTaken = true;
                seats[queryRes[i].seat - 1].isLoggedIn = queryRes[i].loggedIn == 0 ? false : true;
            }
            res.send(seats);
        }
    });
    conn.end();
});
app.post("/bookSeatAndSlot", (req, res) => {
    let conn = mysql_1.default.createConnection({
        host: 'localhost',
        port: 3306,
        user: 'root',
        password: '',
        database: 'lab'
    });
    conn.connect((err) => {
        if (err)
            throw err;
    });
    let date = req.body.date;
    let slot = req.body.slot;
    let seat = req.body.seat;
    let name = req.body.name;
    let roll = req.body.roll;
    let q = `select * from record where date='${date}' and slot=${slot} and seat=${seat}`;
    let flag = false;
    conn.query(q, (err, results, fields) => {
        if (err) {
            res.send("some error");
            return;
        }
        ;
        if (results.length > 0) {
            console.log("checking line", results);
            res.send("already booked");
            flag = true;
            return;
        }
    });
    if (flag)
        return;
    q = `insert into record(name, date, slot, seat, roll, loggedIn) values ('${name}', '${date}', ${slot}, ${seat}, '${roll}', 0);`;
    conn.query(q, (err, results, fields) => {
        if (err) {
            res.send("some error");
            return;
        }
        ;
        console.log("exectuing line", results);
    });
    res.status(200).send("OK");
    return;
});
app.post("/loggedIn", (req, res) => {
    let conn = mysql_1.default.createConnection({
        host: 'localhost',
        port: 3306,
        user: 'root',
        password: '',
        database: 'lab'
    });
    conn.connect((err) => {
        if (err)
            throw err;
    });
    let roll = req.body.roll;
    let username = req.body.name;
    console.log("roll logged in: ", roll, " ", username);
    let q = `update record set loggedIn=1 where name='${username}' and roll=${roll}`;
    conn.query(q, (err, results, fields) => {
        if (err)
            throw err;
        else {
            console.log(fields);
        }
    });
    res.status(200).send("OK");
});
app.listen(port, () => {
    console.log(`listening on port ${port}`);
});

import mysql from "mysql";
import { string } from "yargs";
import yargs from "yargs/yargs";

const argv = yargs(process.argv).options({
    date:{type: "string"},
    slot:{type: "string"},
}).parseSync();

let conn = mysql.createConnection({
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: '',
    database: 'lab'
})

let q = `delete from record where loggedIn=0 and date='${argv.date}' and slot=${argv.slot}`;

conn.query(q, (err, results, fields) => {
    if (err) throw err;
    console.log(results.affectedRows > 0 ? `deleted ${results.affectedRows} row` : 'didnt found row to delete');
    return;
});
conn.end();

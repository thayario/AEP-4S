import mysql from "mysql"

export const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "AfDs@_3,14159265#$%",
    database: "crud"
});
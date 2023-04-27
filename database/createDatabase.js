import db from "./connection.js";

//await db.exec("DELETE FROM users;")


// (DDL)
await db.exec(`
CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    email TEXT UNIQUE NOT NULL,
    password TEXT NOT NULL
);
`);


//db.exec('INSERT INTO users (email, password) VALUES (?, ?)', ["email", "password"])
//db.run('INSERT INTO users (email, password) VALUES (?, ?)', ["daniel", "password"])



console.log(await db.all(`SELECT * from users`))


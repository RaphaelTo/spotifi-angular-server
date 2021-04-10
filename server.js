const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
require('dotenv').config();

const PORT = process.env.PORT || 3000;
const app = express();

const connection = mysql.createConnection({
    host: process.env.HOST,
    user: process.env.USER_DATABASE,
    password: process.env.PASSWORD,
    database: process.env.DATABASE,
});

console.log(connection);

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get('/api/v1/getMusic', (req, res) => {
    connection.query(`SELECT * FROM music`, (err, results) => {
        if (err) {
            return res.json('error');
        }

        res.json(results);
    })
})

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));

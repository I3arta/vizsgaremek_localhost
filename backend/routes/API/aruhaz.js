const express = require('express');
const connection = require('../../middleware/database.js');
const upload = require('../../middleware/upload.js');
const router = express.Router();

// termék lekérdezése route
router.get('/series', function (req, res) {
    connection.query('SELECT * FROM termek', (err, result) => {
        res.json(result);
    });
});

// egy konkrét termék lekérdezése seriesID alapján route
router.get('/series/:id', function (req, res) {
    const id = req.params.id;

    connection.query('SELECT * FROM termek WHERE seriesID=?', [id], (err, result) => {
        res.json(result);
    });
});

// termék lekérdezése userID alapján
router.get('/seriesUser', function (req, res) {

    connection.query('SELECT * FROM termek', (err, result) => {
        res.json(result);
    });
});


// termék létrehozása route
router.post('/series', upload.single('image'), function (req, res) {
    const { name, price, stock } = req.body; // destruktálás = szétbontás
    const imageName = req.file ? req.file.filename : 'no_image.png';

    connection.query('INSERT INTO termek(seriesID, name, price, image, stock) VALUES (NULL, ?, ?, ?, ?)', [name, price, imageName, stock], (err, result) => {
        if (err) {
            console.log(err);
        }
        res.json("Sikeres felvétel!");
    });
});

// termék törlése route
router.delete('/series/:id', function (req, res) {
    const id = req.params.id;

    connection.query('DELETE FROM termek WHERE seriesID=?', [id], (err, result) => {
        res.json("Sikeres törlés!");
    });
});

// termék szerkesztése route
router.put('/series/:id', upload.single('image'), function (req, res) {
    const id = req.params.id;
    const { name, price, stock } = req.body;
    const imageName = req.file ? req.file.filename : null;

    connection.query('UPDATE termek SET name = ?, price = ?, image = COALESCE(?, image), stock = ? WHERE termek.seriesID = ?;', [name, price, imageName, stock, id], (err, result) => {
        res.json("Sikeres módosítás!");
    });
});

// termék közti keresés
router.post('/searching', function (req, res) {
    const searching = req.body.searching;

    connection.query('SELECT * FROM termek WHERE name LIKE CONCAT("%", ?, "%") OR price LIKE CONCAT("%", ?, "%")', [searching, searching], (err, result) => {
        res.json(result);
    });
});

// termék közti keresés userID alapján
router.post('/searchingUser/', function (req, res) {
    const searching = req.body.searching;

    connection.query('SELECT * FROM termek WHERE (name LIKE CONCAT("%", ?, "%") OR price LIKE CONCAT("%", ?, "%"));', [searching, searching], (err, result) => {
        if (err) {
            console.log(err);
        }
        console.log(result);
        res.json(result);
    });
});



// az ár kiszámítása és az elérhető darabszám csökkentése
router.post('/ordering/:id', function(req, res) {
    const id = req.params.id;
    const stock = req.body.stock;

    connection.query('SELECT stock, price FROM termek WHERE seriesID = ?', [id], (err, result) => {
        if (result[0].stock >= stock) {
            const buy = result[0].stock - stock;
            const price = result[0].price * stock;

            connection.query('UPDATE termek SET stock = ? WHERE seriesID = ?', [buy, id], (err, result2) => {
                res.send({ success : true, price : price });
            })
        } else {
            res.send({ success: false, available : result[0].stock });
        }
    });
});

// a rendelés leadása
router.post('/payment', function (req, res) {
    const { price, seriesID, userID } = req.body;

    const date = new Date();
    const orderDate = date.toISOString().slice(0, 19).replace('T', ' ');

    connection.query('INSERT INTO ordering(orderID, userID, seriesID, orderDate, price) VALUES (NULL, ?, ?, ?, ?)', [userID, seriesID, orderDate, price], (err, result) => {
        res.json({ success : true })
    })
});

module.exports = router;
const bcrypt = require('bcrypt');
const express = require('express');
const router = express.Router();
const connection = require('../../middleware/database.js');

const saltRounds = 10;

// felhasználó regisztrációja
router.post('/reg', function (req, res) {
    const { email, username, password } = req.body;

    connection.query('SELECT * FROM user WHERE user.email = ?', [email], (err, result) => {
        if (err) {
            return res.json("Hiba a regisztráció során!");
        }

        if (result.length > 0) {
            return res.status(400).json("A felhasználónév már foglalt!");
        }

        bcrypt.hash(password, saltRounds, (err, hash) => {
            if (err) throw err;

            connection.query('INSERT INTO user (userid, email, username, password, role, userImage) VALUES (NULL, ?, ?, ?, 0, "no_image.png")', [email, username, hash], (err, result) => {
                if (err) {
                    res.json("Hiba a regisztráció során!");
                }

                res.json("Sikeres regisztráció!");
            });
        });
    });
});

module.exports = router;
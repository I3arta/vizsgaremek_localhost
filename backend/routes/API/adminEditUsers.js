const express = require('express');
const connection = require('../../middleware/database.js');
const router = express.Router();

// az összes felhasználó adatainak lekérdezése
router.get('/getUsers', (req, res) => {
    connection.query('SELECT userID, email, username, role FROM user', (err, result) => {
        res.json(result);
    });
});

// keresés a felhasználók adatai között
router.post('/searchingUser', (req, res) => {
    const { searching, searchingType } = req.body;

    const query = `SELECT userID, email, username, role FROM user WHERE ${searchingType} LIKE ?`;
    connection.query(query, [`%${searching}%`], (err, result) => {
        res.json(result);
    });
});

// szerepkör módosítása
router.put('/editRole/:id', (req, res) => {
    const id = req.params.id;
    const editRole = req.body.editRole;
    console.log(id, editRole);
    connection.query('UPDATE user SET role = ? WHERE userID = ?;', [editRole, id], (err, result) => {
        res.json({ success: true });
    });
});

// felhasználó törlése
router.delete('/deleteUser/:id', (req, res) => {
    const id = req.params.id;

    connection.query('DELETE FROM user WHERE userID = ?', [id], (err, result) => {
        res.json({ success: true });
    });
});

module.exports = router;
const express = require('express');
const path = require('path');
const router = express.Router();
const checkRole = require('../../middleware/isAdmin.js');

// editUsers.html route
router.get('/editUsers.html', checkRole(1), function (req, res) {
    res.sendFile(path.join(__dirname, '..', '..', '..', 'frontend', 'html', 'admin', 'editUsers.html'));
});

module.exports = router;
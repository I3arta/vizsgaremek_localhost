const express = require('express');
const path = require('path');
const router = express.Router();

// editUsers.js route
router.get('/editUsers.js', function (req, res) {
    res.sendFile(path.join(__dirname, '..', '..', '..', '..', 'frontend', 'js', 'admin', 'editUsers.js'));
});

module.exports = router;
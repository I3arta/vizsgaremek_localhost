const express = require('express');
const app = express();
const path = require('path');
const cookieParser = require('cookie-parser');
const backendRoutes = require('./routes/routes.js');

const frontendPath = path.join(__dirname, '..', 'frontend');
const imagePath = path.join(__dirname, 'images');

const port = 3000;
const host = 'localhost';

// json parse-hoz (hogy a req.body-ban érkező adatokat fel tudjuk dolgozni)
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// cookie parse-hoz
app.use(cookieParser());

// backend útvonalak használatához
app.use('/', backendRoutes);

// frontend útvonalak használatához
app.use('/frontend', express.static(frontendPath));

// statikus fájlok kiszolgálása az 'images' mappából
app.use('/images', express.static(imagePath));

app.listen(port, host, () => {
    console.log(`IP: http://${host}:${port}`);
});
const express = require('express');
const router = express.Router();

/* html routes */
const indexRoute = require('./html/indexHTML.js');
const regRoute = require('./html/regHTML.js');
const adminRoute = require('./html/adminHTML.js');
const editUsersRoute = require('./html/editUsersHTML.js');
const userRoute = require('./html/userHTML.js');

/* bootsrap routes */
const bootstrapRoute = require('./bootstrap/bootstrap.js');

/* css routes */
const styleCSSRoute = require('./css/styleCSS.js');

/* js (frontend) routes */
const loginRoute = require('./js/login.js');
const registerRoute = require('./js/register.js');
const logoutRoute = require('./js/logout.js');
const adminJSRoute = require('./js/admin/admin.js');
const editUsersJSRoute = require('./js/admin/editUsers.js');
const userJSRoute = require('./js/user/user.js');
const profileJSRoute = require('./js/profile/profile.js');

/* API routes */
const loginDataRoute = require('./API/login.js');
const logoutDataRoute = require('./API/logout.js');
const regDataRoute = require('./API/registration.js');
const sorazatokRoute = require('./API/aruhaz.js');
const getUserEmailRoute = require('./API/getUserEmail.js');
const getUserRoute = require('./API/getUser.js');
const editUserRoute = require('./API/editUser.js');
const adminEditUsersRoute = require('./API/adminEditUsers.js');

// html
router.use('/', indexRoute);
router.use('/', regRoute);
router.use('/', adminRoute);
router.use('/', editUsersRoute);
router.use('/', userRoute);

// bootstrap
router.use('/', bootstrapRoute);

// css
router.use('/', styleCSSRoute);

// frontend js fájljai
router.use('/', loginRoute);
router.use('/', registerRoute);
router.use('/', logoutRoute);
router.use('/', adminJSRoute);
router.use('/', editUsersJSRoute);
router.use('/', userJSRoute);
router.use('/', profileJSRoute);

// API
router.use('/', loginDataRoute);
router.use('/', logoutDataRoute);
router.use('/', regDataRoute);
router.use('/', sorazatokRoute);
router.use('/', getUserEmailRoute);
router.use('/', getUserRoute);
router.use('/', editUserRoute);
router.use('/', adminEditUsersRoute);

module.exports = router;
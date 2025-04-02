const express = require('express');
const session = require('express-session');
const cookieParser = require('cookie-parser');
require('dotenv').config();
const app = express();

app.use(session({ secret: process.env.SESSION_SECRET, resave: false, saveUninitialized: true }));
app.use(cookieParser());

app.get('/track', (req, res) => {
    req.session.visits = (req.session.visits || 0) + 1;
    let visitCount = req.session.visits;

    res.cookie('visitCount', visitCount, {  httpOnly: true });
    res.set('X-Visit-Count', visitCount);

    res.json({ message: `Visit count: ${visitCount}` });
});

app.listen(3000, () => console.log(`Server running at the port ${process.env.PORT}`));

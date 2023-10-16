const express=require("express");
const app=express();
const PORT=4444;
const path=require("path");
const mongoose = require('mongoose');
const session = require('express-session');
const passport = require('./auth/passport');
const MongoStore = require('connect-mongo');
const cors = require("cors");
const { authenticateUser } = require('./middleware/require');
const User = require("./models/user");

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.urlencoded({ extended: true }))

// const controller = require('./controller/controller');

require("dotenv").config()


app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    store: MongoStore.create({ mongoUrl: process.env.MONGO_URL })
}));

app.use(passport.initialize());
app.use(passport.session());;
app.use(cors({
  origin: 'http://localhost:3000' // Replace with your domain
}));


app.use('/api', authenticateUser, require("./routes/auth"));
app.use("/api", authenticateUser,require("./routes/post"));
app.use("/api", authenticateUser,require("./routes/user"));

mongoose.connect(process.env.MONGO_URL)
  .then(() => {
    app.listen(PORT, () => {
      console.log(`http://localhost:` + PORT);
    });
  })
  .catch((err) => {
    console.log(err);
  });
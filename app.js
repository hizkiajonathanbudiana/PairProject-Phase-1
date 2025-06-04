const express = require("express");
const app = express();
const router = require("./routers/router");
const session = require('express-session')


const port = 3005;


app.use(express.urlencoded({ extended: true }));

app.set("view engine", "ejs");


app.use(
  session({
    secret: "rahasiaaa hehehe",
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false, sameSite: true },
  })
);

app.use(router);


app.listen(port, () => {
  console.log(`On port ${port}`);
});

const express = require('express');
const app = express();
const router = require('./routers/router'); 
const port = 3005


app.use(express.urlencoded({ extended: true }));

app.set('view engine', 'ejs');

app.use(router);


app.listen(port, () => {
  console.log(`On port ${port}`);
});
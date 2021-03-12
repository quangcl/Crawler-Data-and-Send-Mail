const express = require('express');
const app = express();
const bodyParser = require("body-parser");
var cors = require('cors');
 
const port = 5000;

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
require('./app/routes/index.js')(app);
app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
});
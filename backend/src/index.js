const express = require('express');
var bodyParser = require('body-parser')

const app = express();

app.use(express.json());

// app.use(bodyParser.json());       // to support JSON-encoded bodies
// app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
//   extended: true
// })); 

app.use(require('./routes'))
app.listen(3000);
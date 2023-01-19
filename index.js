const express = require('express');
const path = require('path');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const morgan = require('morgan');

const app = express();
const port = parseInt(process.env.PORT) || 8080;

// middleware
app.use(cors());
app.use(express.json());
app.use(cookieParser());
app.use(morgan('common'));

// routes
const options = {
  setHeaders: (res, path, stat) => {
    res.set('Access-Control-Allow-Origin', '*')
  }
}
app.use('/static', express.static(path.join(__dirname, 'public'), options))
app.use('/speech', require('./routes/speech/'));
app.use('/', (req, res) => res.send('testing main route'));



app.listen(port, () => console.log(`Server listening on port: ${port}`));

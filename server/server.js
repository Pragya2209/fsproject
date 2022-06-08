require('dotenv').config()
const express = require('express')
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const helmet = require('helmet');

const UserRoute = require('./routes/user');
const ArticleRoute = require('./routes/article');

const port = process.env.PORT

const app = express()

app.use(helmet());
app.use(bodyParser.json())
app.use (bodyParser.urlencoded ({extended: false}))
app.use(cors());

app.use('/user', UserRoute);
app.use('/article', ArticleRoute);

mongoose.connect(process.env.MONGO_URI,{ useUnifiedTopology: true,useNewUrlParser: true})
  .then(() => console.log ('MongoDB Connected'))
  .catch(err => console.error (err))

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
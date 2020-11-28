const express = require('express');
const app = express();
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const routes = require('./routes/routes');

// Global access to env variables
dotenv.config({ path: '.env' });

// Handle CORS requests from app domain
const corsOptions = {
  origin: 'http://localhost:3000',
  credentials: true
};
app.use(cors(corsOptions));

// Parse request body
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));

// All routes prefixed with /api
app.use('/api', routes);

// Connection options that prevent
// deprecation warnings
mongoose.connect(process.env.DATABASE, {
  useUnifiedTopology: true,
  useNewUrlParser: true
})
  .then(() => console.log('Connected to MongoDB database successfully'))
  .catch(err => console.error(`ERROR => ${err}`));
mongoose.set('useCreateIndex', true);

const port = process.env.PORT;
app.listen(port, () => console.log(`Express running at :${port}...`));

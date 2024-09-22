const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors'); // Add this line
const bfhlRoutes = require('./routes/bfhlRoutes');

const app = express();
app.use(bodyParser.json());
app.use(cors({ // Add this line
  origin: 'http://localhost:5173', // Allow requests from frontend at port 5173
  credentials: true
}));

app.use('/bfhl', bfhlRoutes); // Mounting routes

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log("server running successfully balle balle");
});
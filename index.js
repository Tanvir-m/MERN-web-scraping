const express = require('express');
const connectDb = require('./utils/connectDb');
const cors = require('cors');
const fetchRoutes = require('./routes/fetchData');
const authRoutes = require('./routes/auth');
const cookieParser = require('cookie-parser');

const app = express();

app.use(express.json());
app.use(cors());
app.use(cookieParser());

// routes
app.use('/api', fetchRoutes);
app.use('/api/auth', authRoutes);
// database connection
connectDb;

// deploy
if (process.env.NODE_ENV == 'production') {
  app.use(express.static('client/build'));

  const path = require('path');

  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}


const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
  console.log(`Port is running on ${PORT}`);
});

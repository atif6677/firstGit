
const express = require('express');
const cors = require('cors');
const sequelize = require('./src/utils/dbConnection');
const Users = require('./src/models/userModels');
const userRoutes = require('./src/routes/userRoutes');
const path = require('path');

const app = express();
const port = 3000;

app.use(express.json());
app.use(cors());

// Middleware to log all incoming requests
app.use((req, res, next) => {
  console.log(`[Backend Logger] Incoming Request: ${req.method} ${req.url}`);
  next(); // Pass control to the next middleware or route handler
});

app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.use('/api/users', userRoutes);

sequelize.sync({ force: false })
  .then(() => {
    console.log('Database & tables created/synced!');
    app.listen(port, () => {
      console.log(`Server is running on http://localhost:${port}`);
    });
  })
  .catch(err => {
    console.error('Unable to connect to the database or sync models:', err);
  });

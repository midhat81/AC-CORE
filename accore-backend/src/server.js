require('dotenv').config();
const express = require('express');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.get('/api/health', (req, res) => {
  res.status(200).json({ message: 'AC-CORE Backend API is running smoothly.' });
});

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
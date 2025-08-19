const express = require('express');
const cors = require('cors');
require('dotenv').config();
const bienestarRoutes = require('./routes/bienestar.routes');

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/bienestar', bienestarRoutes);

const PORT = process.env.PORT || 3303;
app.listen(PORT, () => {
  console.log(`🚀 API corriendo en puerto ${PORT}`);
});

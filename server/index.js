const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require("dotenv").config();
const userRoutes = require("./routes/userRoutes")

const app = express();
const PORT = process.env.PORT || 5000;
app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose.connect(`mongodb+srv://viExportDBAdmin:${process.env.MONGO_PASSWORD}@viexportcluster.qwtshfs.mongodb.net/`)
.then(() => console.log('Connected to DB'))
.catch(err => console.log(err))

// Define routes and middleware
app.use('/api/users', userRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
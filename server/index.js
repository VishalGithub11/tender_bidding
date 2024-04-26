const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 5000;
app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose.connect(`mongodb+srv://viExportDBAdmin:${process.env.MONGO_PASSWORD}@viexportcluster.qwtshfs.mongodb.net/`, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => console.log('Connected to DB'))
.catch(err => console.log(err))
// Define routes and middleware


app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
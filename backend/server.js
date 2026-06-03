const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const path = require("path");

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
const uploadRoute = require("./routes/uploadRoute");
const sendRoute = require("./routes/sendRoute");

app.use("/api/upload", uploadRoute);
app.use("/api/send", sendRoute);

app.get("/", (req, res) => {
  res.send("AI Cold Mail Agent Running");
});

const PORT = process.env.PORT || 5000;

if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}

module.exports = app;

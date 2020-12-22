const express = require("express");
const connectDB = require("./config/db");
const fileUpload = require("express-fileupload");
const app = express();

const path = require("path");

//connect database

connectDB();

//INIT  midddleware

app.use(express.json({ extended: false }));

//define routes
app.use("/static", express.static("public"));

app.use(fileUpload());

//Upload End point

app.post("/upload", (req, res) => {
  if (req.files === null) {
    return res.status(400).json({ msg: "No file uploaded" });
  }
  const file = req.files.file;
  file.mv(`${__dirname}/client/public/images/${file.name}`, (err) => {
    if (err) {
      console.error(err);
      return res.status(500).send(err);
    }
    res.json({ fileName: file.name, filePath: `/images/${file.name}` });
  });
});

app.use("/api/dishes", require("./routes/dishes"));
app.use("/api/contacts", require("./routes/contacts"));

if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(_dirname, "client", "build", "index.html"));
  });
}

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log("Server started on port ${PORT}"));

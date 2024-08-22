var express = require('express');
var cors = require('cors');
require('dotenv').config()

const multer = require("multer");
const storage = multer.memoryStorage();
const upload = multer({
  storage: storage,
  limits: {
    fileSize: 10000 * 1024, // 100KB
    files: 1,
    fields: 1,
  },
});

var app = express();

app.use(cors());
app.use('/public', express.static(process.cwd() + '/public'));

app.get('/', function (req, res) {
  res.sendFile(process.cwd() + '/views/index.html');
});

app.post("/api/fileanalyse", upload.single("upfile"), (req, res) => {
  const file = req.file;
  const json = {
    name: file.originalname,
    type: file.mimetype,
    size: file.size,
  };
  console.log(json);
  return res.json(json);
});


const port = process.env.PORT || 3000;
app.listen(port, function () {
  console.log('Your app is listening on port ' + port)
});

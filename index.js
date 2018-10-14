const express = require("express");
const fs = require("fs");
const path = require("path");

const bodyParser = require("body-parser");
const morgan = require("morgan");


const app = express();
app.use(bodyParser.json());
app.use(morgan("common", { stream: fs.createWriteStream('./access.log', { flags: 'a' }) }));

require("./routes/apiRoutes")(app);

app.use(
  express.static(
    path.join(__dirname, "client/build")
  )
);

app.get("*", function (req, res) {
  res.sendFile(
    path.join(
      __dirname,
      "client",
      "build",
      "index.html"
    ),
    err => {
      if (err) {
        res.status(500).send(err);
      }
    }
  );
});


const PORT = process.env.PORT || 8000;
app.listen(PORT);

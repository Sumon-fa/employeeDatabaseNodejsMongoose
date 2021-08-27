const express = require("express");
const app = express();
const path = require("path");
const dotenv = require("dotenv");
const session = require("express-session");
const flash = require("connect-flash");
const mongoose = require("mongoose");
const employeeRoutes = require("./routes/employee");
const bodyParser = require("body-parser");
const methodOverride = require("method-override");

dotenv.config({ path: "./config.env" });
//connecting to mongodb database;
mongoose.connect(process.env.DATABASE_LOCAL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
});
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(methodOverride("_method"));
//middleware for express session
app.use(
  session({
    secret: "nodejs",
    resave: true,
    saveUninitialized: true,
  })
);

//middleware for connect flash
app.use(flash());

//Setting messages variables globally
app.use((req, res, next) => {
  res.locals.success_msg = req.flash("success_msg");
  res.locals.error_msg = req.flash("error_msg");
  next();
});

app.use(employeeRoutes);

const port = process.env.PORT;
app.listen(port, () => {
  console.log(`Server started on PORT: ${process.env.PORT}`);
});

//import packages
const express = require("express");
// const cors = require('cors')

//create varables
const PORT = 5000;
const app = express();

//middleware
//for passing json into the re.body
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//custome middleware
function sayHi(req, res, next) {
  const date = new Date();
  // console.log({
  //     day:date.getDay(),
  //     date:date.getDate(),
  //     month:date.getMonth(),
  //     hrs:date.getHours(),
  //     min:date.getMinutes(),
  //     year:date.getFullYear()
  // })
  // console.log("Hello from middleware")
  if (date.getDay() >= 1 && date.getDay() <= 5) {
    console.log("week days !");
  } else {
    console.log("Weekends!");
    res.send("app not avalable on weekends!");
  }
  if (!req.body.name) res.status(400).send("wapi jina");
  next();
}

//import route halders
const userRoute = require('./routes/userRoute')


// app.use('*',sayHi)
//http methods
// app.method(route, routeHandler)
//GET /
app.get("/", (_, res) => {
  res.send("Hello World");
});

app.get('/cars', (req,res)=>res.send("cars here"))
app.use(userRoute)

//POST
app.post("/", (req, res) => {
  const data = req.body;
  //   console.log({ data });
  res.status(201).send(data);
});

//PUT

//DELETE

//start app
//listen(port, callbackFn)

//error catcher
app.all("*", (_, res) => res.status(200).send({ message: "Invalid path" }));

app.listen(PORT, () => console.log(`App running on port ${PORT}`));

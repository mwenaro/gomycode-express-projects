const express = require("express");
const userRouter = express.Router();

let users = [
  { id: 1, name: "Mwero", age: 56 },
  { id: 2, name: "Ngeno", age: 105 },
  { id: 3, name: "Nekesa", age: 39 },
];

//GET /users
userRouter.get("/users", (req, res) => {
  res.send(users);
});

//GET /users/:id
userRouter.get("/users/:id", (req, res) => {
  const {
    params: { id },
  } = req;
  //get user whose id eq to the passed id
  const user = users.find((usr) => usr.id == id);

  //If no user found return 404 eeror with msg
  if (!user) res.status(404).send(`No user with id ${id} has been found!`);
  //others, return the user
  res.send(user);
});

//POST /users
userRouter.post("/users", (req, res) => {
  //get the body
  const { name, age } = req.body;
  if (!name || !age) res.status(400).send("pass name and age");
  const newUser = {
    id: users.length + 1,
    name,
    age,
  };
  users.push(newUser);

  res.send(users);
});

//PUT /users/:id
userRouter.put("/users/:id", (req, res) => {
  //extract id from params
  const id = req.params.id;

  //get request body
  const body = req.body;
  //get the user
  const targetedUser = users.find((user) => user.id == id);

  //echeck if user exists
  if (!targetedUser) res.status(404).send({ message: "user not found" });

  //update the user
  users = users.map((user) => {
    if (user.id == id) return { ...user, ...body };
    return user;
  });

  res.send(users);
});



//DELETE /users/:id
userRouter.delete("/users/:id", (req, res)=>{
 //extract id from params
 const id = req.params.id;

 const userIndex = users.indexOf(users.find(usr=>usr.id==id))

 //check inde validity
 if(userIndex === -1) res.status(404).send({ message: "user not found" });

 users.splice(userIndex,1)

 res.send(users)

})

module.exports = userRouter;

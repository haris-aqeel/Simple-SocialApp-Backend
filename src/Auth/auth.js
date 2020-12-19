const express = require("express");
const routerAuth = express.Router();
const Authorization = require("../schema/AuthSchema");
const bcrypt = require("bcryptjs");

// Registration of a new User

routerAuth.post("/register", async (req, res) => {
  try {
    const { password, confirmpassword } = req.body;
    if (password === confirmpassword) {
      const accountData = new Authorization(req.body);
      const resultAccountCreated = await accountData.save();
      res.status(200).send(resultAccountCreated);
    } else {
      res.status(401).send("Password don't Matched");
    }
  } catch (err) {
    console.log(err);
    res.status(404).send("Failed to Create User");
  }
});

// Login Of a new User

routerAuth.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const userdatabyemail = await Authorization.findOne({ email: email });
    const isMatch = await bcrypt.compare(password, userdatabyemail.password);
    if (isMatch) {
      res.status(200).send(userdatabyemail);
    } else {
      res.send("Invalid Login Details");
    }
  } catch (err) {
    res.status(400).send("Invalid Login Details");
  }
});


routerAuth.get('/userData', async(req, res)=> {
  try{

    const allUserData = await Authorization.find();
    const {_id, name, email} = allUserData;
    res.status(200).send({
      _id,
      name, 
      email
    });


  }catch(err){
    res.status(404).send(err)
  }
})


module.exports = routerAuth;

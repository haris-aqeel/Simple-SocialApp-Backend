const express = require("express");
const routerPost = express.Router();
const UserPosts = require("../schema/DataSchema");
const path = require("path");

// CREATING A POST

routerPost.post("/userPosts", async (req, res) => {
  const { text, personalId, myFile } = req.body;
  const time = new Date().toLocaleDateString();

  const obj = {
    myFile,
    personalId,
    text,
    time,
  };

  try {
    const newPost = new UserPosts(obj);
    const newPostStatus = await newPost.save();
    res.status(200).send(newPostStatus);
  } catch (err) {
    res.status(404).send("Failed to Create Post");
  }
});

// GETTING ALL POST

routerPost.get("/userPosts", async (req, res) => {
  try {
    const allUserPosts = await UserPosts.find();
    res.status(200).send(allUserPosts);
  } catch (err) {
    res.status(404).send("Failed to Fetch all Posts.");
  }
});
  
// DELETING ALL POST

routerPost.delete("/userPosts", async (req, res) => {
  try {
    const { _id } = req.body;
    const allUserPosts = await UserPosts.deleteOne({ _id: _id });
    res.status(200).send(allUserPosts);
  } catch (err) {
    res.status(404).send("Failed to Delete Post.");
  }
});

// EDITTING A POST

routerPost.put("/userPosts", async (req, res) => {
  const { _id, text, personalId, myFile } = req.body;
  const time = new Date().toLocaleDateString();

  const obj = {
    myFile,
    personalId,
    text,
    time,
  };

  try {
    const updatePost = await UserPosts.updateOne({ _id: _id }, obj);
    res.status(200).send(updatePost);
  } catch (err) {
    res.status(404).send("Failed to Update the Post");
  }
});

module.exports = routerPost;

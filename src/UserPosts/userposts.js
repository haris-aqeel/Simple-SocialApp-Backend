const express = require("express");
const routerPost = express.Router();
const UserPosts = require("../schema/DataSchema");
var multer  = require('multer');
const path = require('path')

var cloudinary = require('cloudinary').v2

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET
});
  


var storage = multer.diskStorage({
  destination:function(req,file,cb){
      cb(null,'uploads') 
  },
  filename:function(req,file,cb) {
      cb(null,file.fieldname + '-' + Date.now() + path.extname(file.originalname))
  }
})



var upload = multer ({
  storage:storage
})


// CREATING A POST 

routerPost.post('/userPosts', upload.single('myFile') , async(req,res,next)=>{

  const {text, personalId} = req.body;
  const time = new Date().toLocaleDateString();

const result = await cloudinary.uploader.upload(req.file.path)

const obj = {
    image: result.url,
    personalId,
    text,
    time
}

  try{
    const newPost = new UserPosts(obj);
    const newPostStatus = await newPost.save();
    res.status(200).send(newPostStatus);
  }catch(err){
    res.status(404).send("Failed to Create Post")
  }
  


})

// GETTING ALL POST

routerPost.get('/userPosts', async(req, res)=> {

  try{

    const allUserPosts = await UserPosts.find();
    res.status(200).send(allUserPosts);

  }catch(err){
    res.status(404).send("Failed to Fetch all Posts.")
  }
  
});

// DELETING ALL POST

routerPost.delete('/userPosts', async(req, res)=> {

  try{
    const {_id} = req.body;
    const allUserPosts = await UserPosts.deleteOne({_id: _id});
    res.status(200).send(allUserPosts);

  }catch(err){
    res.status(404).send("Failed to Delete Post.")
  }
  
});

// EDITTING A POST
 
routerPost.put('/userPosts', upload.single('myFile') , async(req,res,next)=>{

  const {_id , text, personalId} = req.body;
  const time = new Date().toLocaleDateString();

const result = await cloudinary.uploader.upload(req.file.path)

const obj = {
    image: result.url,
    personalId,
    text,
    time
}

  try{
    const updatePost = await UserPosts.updateOne({_id: _id}, obj);
    res.status(200).send(updatePost);
  }catch(err){
    res.status(404).send("Failed to Update the Post")
  }

})





module.exports = routerPost;
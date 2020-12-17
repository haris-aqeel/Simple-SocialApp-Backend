const mongoose = require('mongoose');
require('dotenv').config()

const connectionString = process.env.MONGODB_URL;

mongoose.connect(connectionString, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: true
}).then(()=> {
    console.log("Connected to MONGODB database")
}).catch((err)=> {
    console.log(err)
})
const express = require('express');
const app = express();
require('./database/connection');
const port = process.env.PORT || 3000;
const routerAuth = require('./Auth/auth');
const routerPost = require('./UserPosts/userposts');
app.use(express.json());





app.use(routerAuth);
app.use(routerPost);




app.listen(port, ()=> {
    console.log(`listening to the port ${port}`)
})
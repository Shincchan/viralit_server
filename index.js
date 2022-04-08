const express =require('express');
const app = express();
const PORT = 5000;
const mongoose = require('mongoose');
const {MONGOURI} = require('./keys');



//setting up mongodb connection
mongoose.connect(MONGOURI,{
    useNewUrlParser:true,
    useUnifiedTopology:true
});
mongoose.connection.on('connected',()=>{
    console.log('connected to mongodb');
})
mongoose.connection.on('error',(err)=>{
    console.log('error in database',err);
})

//requiring schema
require('./models/user');
require('./models/post');

//parsing data to json
app.use(express.json());

app.use(require('./routes/auth'));
app.use(require('./routes/post'));
app.use(require('./routes/user'));




app.listen(PORT,()=>{
    console.log("server is running on ", PORT);
})
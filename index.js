const express =require('express');
const PORT = 5000;

const app = express();

app.get('/',(req,res)=>{
    res.send('hello world');
})

app.listen(PORT,()=>{
    console.log("server id running on ", PORT);
})
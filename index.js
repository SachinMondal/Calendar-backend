const express=require("express");
const app=express();
const bodyParser=require("body-parser");
const cors=require("cors");
const port=8000;
const db=require("./config/db");
app.use(cors());
app.use(bodyParser.json());

app.use(express.urlencoded({ extended:true }));
app.use("/",require("./routers"));
app.listen(port,function(err){
    if(err){
        console.log('Error in connecting to the server');
    }else{
        console.log('Server is running on port',port);
    }
});
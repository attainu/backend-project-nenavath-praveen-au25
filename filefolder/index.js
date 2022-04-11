const express=require('express')
const bodyParser=require("body-parser")
const app=express()
app.get("/home",(req,res)=>{
    res.send("this is home page")
})
app.post("/home",(req,res)=>{
    const data=req.body.data;
    if(data){
        res.send("you have send data "+data)
    }
    else{
        res.send("you have not send data")
    }
})




app.listen(5000,(err)=>{
    console.log(err);
})










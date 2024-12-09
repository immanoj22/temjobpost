import express from "express";
import db from"./database.js"
import cors from "cors"
import bodyParser from "body-parser";

const app=express();
app.use(bodyParser.json())
app.use(
    cors({
        origin:"http://localhost:3000",methods:["GET","POST","PATCH","DELETE"]
    })
)
app.get("/",(req,res)=>{
    res.send("Hello")
})

app.get("/home",async(req,res)=>{
    try{
       let result= await db.query("SELECT * FROM companylist ORDER BY id ASC")
        
       return res.json(result.rows)
    }catch(err){
        console.log(err)
    }
    
})

app.post("/submit",async(req,res)=>{
    const{createjobtitile,companyname,district,jobtype,minsalary,maximumsalary,jobdescription,selectedDate}=req.body
   try{
    await db.query("INSERT INTO companylist (createjobtitile,companyname,district,jobtype,minsalary,maximumsalary,jobdescription,selecteddate) VALUES ($1,$2,$3,$4,$5,$6,$7,$8)",[
        createjobtitile,companyname,district,jobtype,minsalary,maximumsalary,jobdescription,selectedDate
    ])
   }catch(err){
    console.log(err)
   }
    
})

app.listen(9000,(err)=>{
    if(err){
        console.log(err)
    }
    console.log("the port is running")
})
const express = require("express")
const cors = require("cors")
const nodemailer = require("nodemailer");
const mongoose = require("mongoose")
const app = express()
app.use(cors())
app.use(express.json())
mongoose.connect("mongodb+srv://mahi87331:mahi7878@cluster0.ukeic.mongodb.net/passkey?retryWrites=true&w=majority&appName=Cluster0").then(function(){
  console.log("connected to db");
}).catch(function(){
  console.log("connecting failed");
})
const credential = mongoose.model("credential",{},"bulkmail")



app.post("/email",function(req, res){
  var msg = req.body.msg
  var emaillist = req.body.emaillist

  credential.find().then(function(data){
    const transporter = nodemailer.createTransport({
      service:"gmail",
      auth: {
        user: data[0].toJSON().user,
        pass: data[0].toJSON().pass,
      },
    });
    new Promise(async(resolve, reject) => {
      try {
        for(var i=0;i<emaillist.length;i++)
          {
             await transporter.sendMail({
      
              from:"mahi87331@gmail.com",
              to:emaillist[i],
              subject:" a message from bulkmail app",
              text:msg
          },
        )
        console.log("email send to:"+emaillist[i]);
        
          }
    
         resolve("sucesss")
      } catch (error) {
       reject("failed")
      }
        
    }).then(function(){
      res.send(true)
    }).catch(function(){
      res.send(false)
    })
  }).catch(function(error){
    console.log(error); 
  })
})


app.listen(5000,function(){
    console.log("server start....")
    
})
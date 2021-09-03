const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const mongoose = require('mongoose');

const app = express();

mongoose.connect('mongodb+srv://m001-student:m001-mongodb-basics@cluster0.wao3g.mongodb.net/myFirstDatabase?retryWrites=true&w=majority',{useNewUrlParser: true, useUnifiedTopology: true});

const subscribersSchema = new mongoose.Schema({
    name: String,
    lname:String,
    email:String
});

const  survey = new mongoose.model("subsciber", subscribersSchema);

app.use(express.static("public"));
app.set('view engine','ejs');
app.use(bodyParser.urlencoded({extended:true}));

app.get('/',(req,res)=>{
    res.sendFile(__dirname + "/form.html");
})

app.post('/',(req,res)=>{
    let fname = req.body.fname;
    let lname = req.body.lname;
    let email = req.body.email;
    if(fname == "" || lname == "" || email== "" || fname.length < 3  || lname.length < 3 || email.length < 3)
    {
        res.sendFile(__dirname+"/Failures.html");
        return;
    }
    else{
        const sub1 = new survey({
         name: fname,
         lname:lname,
         email:email
        });

         sub1.save();

        res.render("name",{ name1:fname, name2:lname });
        res.sendFile(__dirname+"\views/name.ejs");
        return;
    }
})

app.listen(process.env.PORT || 3000,function(){
    console.log(process.env.PORT);
});

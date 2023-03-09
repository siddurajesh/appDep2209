const express = require("express");
const cors = require("cors");
const path = require("path");
const mongoose = require("mongoose");
mongoose.connect("mongodb+srv://siddurajesh1947:siddurajesh1947@mycluster.argnoww.mongodb.net/users?retryWrites=true&w=majority")

const app = express();

app.use(cors());
app.use(express.static(path.join(__dirname),"./client/build"));


app.get("/trainsOfIndia",(req,res)=>{
    res.json(["BhagyanagarExp","IntercityExp","KaghaznagarExp","ApSamparkKranthiExp","KarimnagarExp"]);
});
let usersSchema = new mongoose.Schema({
    name:{
        type:String,
        minLength:2,
        maxLength:30,
        required:true,
        uppercase:true,
    },
    email:{
        type:String,
        required:true,
        validate:{
            validator:function(v){
                return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(v);
            },
            message:(props)=> `${props.value} is not a valid email!`,
        },
    },
    age:{
        type:Number,
        required:true,
        min:[18,"Too young to create account"],
        max:[120,"Must be joking, you are giving wrong age"],
    },

    employeeId:Number,

    gender:{
        type:String,
        required:true,
        enum:["Male","Female"],
    },
});

let Users = new mongoose.model("employees",
usersSchema);

app.get("/getUsers",async (req,res)=>{

 let usersData = await Users.find();  
  
 res.json(usersData);

})



app.listen(2222,()=>{
    console.log("Listening to 2222")
})
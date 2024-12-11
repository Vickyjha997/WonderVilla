const mongoose=require("mongoose");
const info=require("./data.js");
const Listing=require("../models/listing.js");

mongoose.connect('mongodb://127.0.0.1:27017/wondervilla')
.then((res)=>{
    console.log("Connection sucesss...");
}).catch((err)=>{
    console.log("Database error...");
    console.log(err);
});

const initdb= async ()=>{
   await Listing.deleteMany({});
   console.log("Data deleted");
   info.data=info.data.map((object)=>({...object,owner:"66bf9d4960d3ce810253c51e"}));
   await Listing.insertMany(info.data);
   console.log("Data inserted");
};

initdb();

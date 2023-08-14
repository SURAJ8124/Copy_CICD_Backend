const mongoose = require("mongoose");

const connectDb= async()=>{
   CONECTIONSTRING="mongodb+srv://surajchavan1532:LFzND8RMnbuMozjJ@cluster0.jeuhijb.mongodb.net/CICD_Deployment_Copy@?retryWrites=true&w=majority"

   try{
    const connect = await mongoose.connect(CONECTIONSTRING)
    console.log(
        "Database connected: ",
    connect.connection.host,
    connect.connection.name
    )
   }catch(err){
      console.log(err);
      process.exit(1);
   }
};

module.exports=connectDb;
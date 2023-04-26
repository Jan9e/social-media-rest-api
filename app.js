import express from "express";
import mongoose from "mongoose";
import router from "./routes/user-routes";
import blogRouter from "./routes/blog -routes";
const app=express();
app.use(express.json());

app.use("/api/user", router);
app.use("/api/Blog", blogRouter);

mongoose.connect('Mongodb_URI')
.then(()=>app.listen(5000))
.then(()=> console.log("connected to database and listened to port 5000"))
.catch((err)=> console.log(err));



//iyDZjdJODyY2X0uW(mongo)

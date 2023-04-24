const express = require("express");
const mongoose = require("mongoose");
const app = express();

const dotenv = require("dotenv");
dotenv.config();

// for converting the request from string to json 
app.use(express.json());

//maintaining log for all requests
app.use((req, res, next) =>{
    console.log("HTTP method - " +  req.method + " , URL " + req.url);
    next();
})

const userRouter = require("./routes/UserRoutes");
const noteRouter = require("./routes/noteRoutes");

app.use("/users", userRouter);
app.use("/notes", noteRouter);

const PORT = process.env.PORT || 5000 ;


mongoose.connect(process.env.MONGO_URL)
.then(() =>{
    app.listen(PORT, () =>{
        console.log("server started at port number " + PORT);
    });
})
.catch((error)=>{
    console.log(error);
});




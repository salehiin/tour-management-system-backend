/* eslint-disable no-console */
import { Server } from "http";
import mongoose from "mongoose";
import app from "./app";
import { envVars } from "./app/config/env";

let server: Server;

const startServer = async () => {
    try {
        // console.log(process.env.NODE_ENV);
        console.log(envVars.NODE_ENV);
        await mongoose.connect(envVars.DB_URL)

        // console.log("Connected to DB!!!")

        server = app.listen(envVars.PORT, () => {
            console.log(`Server is listening to port ${envVars.PORT}`)
        })

    } catch (error) {
        console.log(error);
    }
}

startServer()

process.on("unhandledRejection", (err)=>{
    console.log("Unhandled rejection detected... Server shutting down...", err);
    if(server){
        server.close(() =>{
            process.exit(1)
        });
    }
    process.exit(1)
})
// Unhandled rejection error
// Promise.reject(new Error("I forgot to catch this promise"))


process.on("uncaughtExceptionMonitor", (err)=>{
    console.log("Uncaught Exception detected... Server shutting down...", err);
    if(server){
        server.close(() =>{
            process.exit(1)
        });
    }
    process.exit(1)
})
// Uncaught Exception error
// throw new Error("I forgot to handle this local error")

process.on("SIGTERM", ()=>{
    console.log("Sigterm signal received... Server shutting down...");
    if(server){
        server.close(() =>{
            process.exit(1)
        });
    }
    process.exit(1)
})

process.on("SIGINT", ()=>{
    console.log("Sigint signal received... Server shutting down...");
    if(server){
        server.close(() =>{
            process.exit(1)
        });
    }
    process.exit(1)
})

// unnandled rejection error - promise rejection
// uncaught rejection error
// signal termination - sigterm


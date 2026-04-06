
import dotenv from "dotenv"
dotenv.config()

if(!process.env.MONGODB_URI){
    throw new Error("MONGODB_URI doesnt exist in the env")
}

if(!process.env.JWT_SECRET){
    throw new Error("JWT_SECRET doesnt exita in the env")
}

export const config =  {
    MONGODB_URI: process.env.MONGODB_URI,
    JWT_SECRET: process.env.JWT_SECRET
}


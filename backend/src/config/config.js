
import dotenv from "dotenv"
dotenv.config()

if (!process.env.MONGODB_URI) {
    throw new Error("MONGODB_URI doesnt exist in the env")
}

if (!process.env.JWT_SECRET) {
    throw new Error("JWT_SECRET doesnt exita in the env")
}

if (!process.env.GOOGLE_CLIENT_ID) {
    throw new Error("GOOGLE_CLIENT_ID doesnt exists in the env")
}
if (!process.env.GOOGLE_CLIENT_SECRET) {
    throw new Error("GOOGLE_CLIENT_SECRET doesnt exists in the env")
}
if (!process.env.GOOGLE_REFRESH_TOKEN) {
    throw new Error("GOOGLE_REFRESH_TOKEN doesnt exists in the env")
}
if (!process.env.GOOGLE_USER) {
    throw new Error("GOOGLE_USER doesnt exists in the env")
}

export const config = {
    MONGODB_URI: process.env.MONGODB_URI,
    JWT_SECRET: process.env.JWT_SECRET,
    GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID,
    GOOGLE_CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET,
    GOOGLE_REFRESH_TOKEN: process.env.GOOGLE_REFRESH_TOKEN,
    GOOGLE_USER: process.env.GOOGLE_USER
}


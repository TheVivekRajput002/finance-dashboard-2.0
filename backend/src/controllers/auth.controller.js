import userModel from "../models/user.model.js"
import crypto from "crypto"
import jwt from "jsonwebtoken"
import { config } from '../config/config.js'
import { urlencoded } from "express"

export async function register(req,res) {
    const { username, email, password } = req.body

    const isAlreadyRegistered = await userModel.findOne({
        $or: [
            { username },
            { email }
        ]
    })

    if (isAlreadyRegistered) {
        res.status(409).json({
            message: "username or email already exists"
        })
    }

    const hashedpassword = crypto.createHash("sha256").update(password).digest("hex");

    const user = await userModel.create({
        username,
        email,
        password: hashedpassword
    })

    const token = jwt.sign({
        id: user._id
    },
        config.JWT_SECRET,
        {
            expiresIn: "1d"
        }
    )

    res.status(201).json({
        message: "user created successfully",
        user: {
            username: user.username,
            email: user.email
        },
        token
    })
}

export async function getme(req,res){
    const token = req.headers.authorization?.split(" ")[1]

    if(!token){
        res.status(404).json({
            message:"token not found"
        })
    }

    const decoded = jwt.verify(token, config.JWT_SECRET)

    const user = await userModel.findById(decoded.id)

    res.status(200).json({
        message:"user fetched successfully",
        user: {
            username:user.username,
            email:user.email
        }
    })
}


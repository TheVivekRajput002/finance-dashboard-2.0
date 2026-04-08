import userModel from "../models/user.model.js"
import crypto from "crypto"
import jwt from "jsonwebtoken"
import { config } from '../config/config.js'
import sessionModel from "../models/session.model.js"
import { networkInterfaces } from "os"

export async function register(req, res) {
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

    // 1st generate refresh token
    const refreshToken = jwt.sign({
        id: user._id
    },
        config.JWT_SECRET,
        {
            expiresIn: "7d"
        }
    )


    // 2nd create sessionModel
    const refreshTokenHash = crypto.createHash("sha256").update(refreshToken).digest("hex");

    const session = await sessionModel.create({
        user: user._id,
        refreshTokenHash,
        ip: req.ip,
        userAgent: req.headers["user-agent"]
    })

    // 3rd generate access token
    const accessToken = jwt.sign({
        id: user._id,
        sessionId: session._id
    },
        config.JWT_SECRET,
        {
            expiresIn: "15min"
        }
    )

    res.cookie("refreshToken", refreshToken, {
        httpOnly: true,
        secure: true,
        sameSite: "strict",
        maxAge: 7 * 24 * 60 * 60 * 1000 // 7days
    })

    res.status(201).json({
        message: "user created successfully",
        user: {
            username: user.username,
            email: user.email
        },
        accessToken
    })
}

export async function getme(req, res) {
    const token = req.headers.authorization?.split(" ")[1]

    if (!token) {
        res.status(404).json({
            message: "token not found"
        })
    }

    const decoded = jwt.verify(token, config.JWT_SECRET)

    const user = await userModel.findById(decoded.id)

    res.status(200).json({
        message: "user fetched successfully",
        user: {
            username: user.username,
            email: user.email
        }
    })
}

export async function refreshToken(req, res) {
    const { refreshToken } = req.cookies

    if (!refreshToken) {
        res.status(401).json({
            message: "refresh token not found"
        })
    }

    const decoded = jwt.verify(refreshToken, config.JWT_SECRET);

     const refreshTokenHash = crypto.hash("sha256").update(refreshToken).digest("hex");

    const session = await sessionModel.findOne({
        refreshTokenHash,
        revoked: false
    })

    
    if (!session) {
        return res.status(400).json({
            message: "Invalid refresh token"
        })
    }

    const accessToken = jwt.sign({
        id: decoded.id
    }, config.JWT_SECRET, {
        expiresIn: "15m"
    })

    const newRefreshToken = jwt.sign({
        id: decoded.id
    },
        config.JWT_SECRET,
        {
            expiresIn: "7d"
        }
    )

    const newRefreshTokenHash = crypto.hash("sha256").update(newRefreshToken).digest("hex")

    session.refreshTokenHash = newRefreshTokenHash;
    await session.save()

    res.cookie("refreshToken", newRefreshToken, {
        httpOnly: true,
        secure: true,
        sameSite: "strict",
        maxAge: 7 * 24 * 60 * 60 * 1000 // 7d
    })

    res.status(200).json({
        message: "access token refreshed",
        accessToken
    })
}

export async function logout(req, res) {
    const { refreshToken } = req.cookies

    if (!refreshToken) {
        return res.status(400).json({
            message: "refresh token not found"
        })
    }

    const refreshTokenHash = crypto.hash("sha256").update(refreshToken).digest("hex");

    const session = await sessionModel.findOne({
        refreshTokenHash,
        revoked: false
    })

    if (!session) {
        return res.status(400).json({
            message: "Invalid refresh token"
        })
    }

    session.revoked = true;
    await session.save()

    res.clearCookie(refreshToken)

    res.status(200).json({
        message: "logged out successfully"
    })
}


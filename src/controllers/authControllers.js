import bcrypt from 'bcryptjs'
import User from '../models/users'
import jwt from 'jsonwebtoken'
// import database from '../middlewere/dbConnection';
import asyncHandler from 'express-async-handler'

const login = async (req, res) => {
    const { email, password } = req.body

    if (!email || !password) {
        return res.status(400).json({ message: "All fields are required." })
    }

    const user = await User.findOne({ email }).lean().exec()

    if (!user) {
        return res.status(400).json({ message: "User does not exist." })
    }

    const match = await bcrypt.compare(password, user.password)
    if (!match) {
        return res.status(401).json({ message: "Invalid Password." })
    }

    const access_token = jwt.sign(
        {
            "UserInfo": {
                "email": user.email,
                "roles": user.roles
            }
        },
        process.env.ACCESS_TOKEN_SECRET,
        { expiresIn: '24h' }
    )

    const refresh_token = jwt.sign(
        { "email": user.email },
        process.env.REFRESH_TOKEN_SECRET
    )
    res.cookie('jwt', refresh_token, {
        httpOnly: true,
        secure: true,
        sameSite: 'None',
        maxAge: 15 * 60 * 1000
    })
    if(user.active == false) {
        const generateOTP = (length = 6) => {
            let passOTP = ''
            const characters = '0123456789'
        
            for (let i = 0; i < length; i++) {
                const index = Math.floor(Math.random() * characters.length)
                passOTP += characters[index]
            }
            // console.log(typeof(passOTP))
            return passOTP
        }
        const otp = generateOTP()
        await User.findByIdAndUpdate(user._id, {
            $set: { 
                otp: otp, 
                otp_expiry: new Date(Date.now() + 10 * 60 * 1000) 
            }
        })
        await sendMail(user.email, otp, user.firstname)
    } 

    res.status(200).json({
        message: {
            token: refresh_token,
            username: user.username,
            email: user.email,
            roles: user.roles,
            firstname: user.firstname,
            lastname: user.lastname,
            active_status: user.active
        }
    })
}

const refresh = (req, res) => {
    const { otp } = req.body;

    const authHeaders = req.headers?.authorization || req.headers.Authorization

    if(!authHeaders?.startsWith('Bearer ')) {
        return res.status(401).json({ message: "unauthorized" })
    }

    const token = authHeaders.split(' ')[1]

    // const cookies = req.cookies;
    // if (!cookies?.jwt) {
    //     return res.status(401).json({ message: "Unauthorized: cookie not found" })
    // }
    console.log(typeof(token), typeof(process.env.REFRESH_TOKEN_SECRET))
    if(!token) {
        return res.status(401).json({ message: "Unauthorized: token not found" })
    }

    const refresh_token = token
    // const refresh_token = auth_token
    // console.log(refresh_token)

    jwt.verify(
        refresh_token,
        process.env.REFRESH_TOKEN_SECRET,
        async (err, decoded) => {
            console.log("first", err)
            console.log("hello", decoded)
            if (err) return res.status(403).json({ message: `Forbidden: error in verifying jwt: ${err}` })

            const user = await User.findOne({ email: decoded.email }).lean().exec();
            if (!user) {
                return res.status(401).json({ message: "You are Unauthorized" })
            }
            const currentTime = new Date(Date.now())
            if (user.active === false) {
                if (!otp) {
                    return res.status(400).json({ message: "OTP field is required." })
                }
                if (otp !== user.otp || user.otp_expiry < currentTime) {
                    return res.status(401).json({ message: "Invalid OTP." })
                }
                await User.findByIdAndUpdate(user._id, {
                    $set: { active: true }
                })
            }

            const access_token = jwt.sign(
                {
                    "UserInfo": {
                        "username": user.username,
                        "roles": user.roles
                    }
                },
                process.env.ACCESS_TOKEN_SECRET,
                { expiresIn: "90d" }
            )
            return res.status(201).json({
                message: {
                    token: access_token,
                    username: user.username,
                    email: user.email,
                    roles: user.roles,
                    firstname: user.firstname,
                    lastname: user.lastname,
                    active_status: user.active
                }
            })
        })

}

const verifyEmail = async (req, res) => {
    const { otp, email } = req.body;

    const user = await User.findOne({ email }).lean().exec()
    const currentTime = new Date(Date.now())
    if (user.active === false) {
        if (!otp) {
            return res.status(400).json({ message: "OTP field is required." })
        }
        if (otp !== user.otp || user.otp_expiry < currentTime) {
            return res.status(401).json({ message: "Invalid OTP." })
        }
        await User.findByIdAndUpdate(user._id, {
            $set: { active: true }
        })
        return res.status(201).json({ message: 'Email verified successfully.' })
    }
    else {
        res.status(200).json({ message: "Email is already verified."})
    }
}

const logout = (req, res) => {
    const cookies = req.cookies;
    if (!cookies?.jwt) {
        return res.sendStatus(204);
    }
    res.clearCookie('jwt', { httpOnly: true, sameSite: "None", secure: true })
    res.json({ message: 'Cookies cleared' })

}

export default {
    login,
    refresh,
    logout,
    verifyEmail
}
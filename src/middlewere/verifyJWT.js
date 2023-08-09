import jwt from 'jsonwebtoken';

const verifyJWT = (req, res, next) => {
    const authHeaders = req.headers?.authorization || req.headers.Authorization

    if(!authHeaders?.startsWith('Bearer ')) {
        return res.status(401).json({ message: "unauthorized" })
    }

    const token = authHeaders.split(' ')[1]

    jwt.verify(
        token,
        process.env.ACCESS_TOKEN_SECRET,
        (err, decoded) => {
            if(err) {
                return res.status(403).json({ message: "Forbidden" })
            }
            req.user = decoded.UserInfo.username;
            req.roles = decoded.UserInfo.roles
            next()
        }
    )
}

export default verifyJWT
import express from 'express';

const router = express.Router();
import verifyJWT from '../middlewere/verifyJWT';

// router.use(verifyJWT)

router.route('/').get(verifyJWT, (req,res) => {
    if (req.body) {
        console.log("API and body testing successful!", req.body.user)
        return res.status(200).json({
            status: true,
            message: "API and body testing successful!"
        })
    } 
    else {
        console.log("Body passing error")
        return res.status(404).json({
            status: false,
            message: "Body passing error"
        });

    }
})

export default router;
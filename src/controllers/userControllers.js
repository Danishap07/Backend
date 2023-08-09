import usersDB from '../models/users';
import bcrypt from 'bcryptjs'
import database from '../middlewere/dbConnection';

const getAllUsers = async (req, res) => {
    const user = await usersDB.find().select('-password').lean()
    if (!user) {
        // console.log(result)
        return res.status(400).json({ message: "Unable to fetch data from backend.", error: err })
    }
    res.json(user);
}

const createNewUsers = async (req, res) => {
    const { username, email, password, firstname, lastname, city, state, pincode, mobile_no, address, country, roles } = req.body

    if (!username || !password) {
        return res.status(400).json({ message: "Username and password are required." })
    }
    const duplicate = await usersDB.findOne({ username: username }).exec();
    if (duplicate) return res.status(409).json({ message: "Username already exist." });
    try {
        const hashed_pwd = await bcrypt.hash(password, 10);
        const result = await usersDB.create({
            "username": username,
            "email": email,
            "password": hashed_pwd,
            "firstname": firstname,
            "lastname": lastname,
            "city": city,
            "address": address,
            "mobile_no": mobile_no,
            "pincode": pincode,
            "country": country,
            "state": state,
            // "roles": roles
        })
        console.log(result);

        return res.status(200).json({ message: `New User ${username} created successfully.` })


    } catch (error) {
        return res.status(500).json({ message: error.message })

    }



    // database.query(`SELECT * FROM user WHERE email='${email}'`, async(err, result) => {
    //     if(result.length) {
    //         return res.status(409).json({ message: "User already exist."})
    //     }
    //     // hash the password
    //     console.log(user_role);

    //     const dbQuery = `INSERT INTO user(email, password, firstName, lastName, city, state, zip, mobile_no, address, country, user_role) VALUES ('${email}','${hashed_pwd}','${firstName}','${lastName}','${city}','${state}','${zip}','${mobile_no}','${address}','${country}', [${user_role}])`
    //     await database.query(dbQuery, (err, result) => {
    //         if (err) {
    //             return res.status(400).json({message: "Unable to create user.", err})
    //         }
    //         else {
    //             return res.status(200).json({message: `New User ${email} created successfully.`})
    //         }
    //     })
    // })
}

const updateUsers = async (req, res) => {
    const { id, username, password, email, firstName, lastName, city, state, zip, mobile_no, address, country, roles } = req.body

    if (!id || !email || !Array.isArray(roles) || !roles.length) {
        return res.status(400).json({ message: "All fields are required!" })
    }

    const user = await usersDB.findById(id).exec()
    if (!user) {
        return res.status(400).json({ message: 'User not found' })
    }

    const duplicate = await usersDB.findOne({ username }).lean().exec()
    if(duplicate && duplicate?._id.toString() !== id) {
        return res.status(409).json({ message: "Duplicate username" })
    }

    user.username = username
    user.roles = roles

    if(password) {
        user.password = await bcrypt.hash(password, 10)
    }

    const updateUser = await user.save()

    res.json({ message: `${updateUser.username} updated` })

    // database.query(`SELECT * FROM user WHERE id='${id}'`, (err, result) => {
    //     if (err) {
    //         return res.status(400).json({ message: 'User not found' })
    //     }
    //     else {
    //         const user = result[0]
    //         database.query(`SELECT * FROM user WHERE email='${email}'`, (err, rslt) => {
    //             if (rslt[0] && rslt[0]?.id.toString() !== id) {
    //                 return res.status(409).json({ message: 'Duplicate user found. ' })
    //             }

    //             user.email = email
    //             user.user_role = user_role
    //         })
    //     }
    // })
    // return await res.status(200).json({ message: "routing is proper and OP!" })
}

const deleteUsers = async (req, res) => {
    // return await res.status(200).json({ message: "routing is proper and OP!" })
    const { id } = req.body;

    if(!id) {
        return res.status(400).json({ message: "User ID is required." })
    }


}

export default {
    getAllUsers,
    createNewUsers,
    updateUsers,
    deleteUsers
}
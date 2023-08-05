const User = require("../model/userModel");
const { ObjectId } = require('mongodb');
const bcrypt = require('bcryptjs');
const { generateAdminToken, generateUserToken } = require("../middleware/auth");
const errorHandler = require("../middleware/errorHandler");
const CustomError = require("../middleware/customError");

// Create User
const createUser = async (req, res) => {

    try {
        const existingUser = await User.findOne({ email: req.body.email });
        if (!existingUser) {
            const { name, email, contact, password, isAdmin } = req.body;
            const user = await User.create({
                name,
                email,
                contact,
                password,
                isAdmin
            });
            res.send({ user }).status(201);
        }
        else {
            const err1 = new CustomError('User Already exists', 404);
            return errorHandler(err1, req, res);
        }
    }
    catch (error) {
        const err = new CustomError('Error!', 404);
        return errorHandler(err, req, res);
    }
};


// find User By Id
const findUser = async (req, res) => {

    try {
        const userId = req.params.id;
        const user = await User.find({ _id: new ObjectId(userId) });
        if (user.length === 0) {
            const err1 = new CustomError('User not found', 404);
            return errorHandler(err1, req, res);
        }
        res.status(200).json({ user });


    }
    catch (error) {
        const err = new CustomError('UserID length should be 24 digits', 500);
        errorHandler(err, req, res);
    }
};

// update user
const updateUser = async (req, res) => {

    const userId = req.params.id;
    if (req.body && Object.keys(req.body).length) {
        const userData = req.body;
        try {
            userData.password = await bcrypt.hash(userData.password, 10);
            const user = await User.findByIdAndUpdate(userId, userData, { new: true });
            if (!user) {
                const err = new CustomError(`Sorry, '${userId}' userID not found!`, 404);
                errorHandler(err, req, res);
            }


            res.status(201).send(user);

        }

        catch (error) {
            const err = new CustomError('Something went wrong', 500);
            return errorHandler(req, res, err);
        }
    }
    else {
        res.status(404).json({ msg: 'body empty' })

    }

};

// delete User

const deleteUser = async (req, res) => {

    const userId = req.params.id;
    const user = await User.findByIdAndDelete(userId);
    if (!user) {
        res.status(404).send("Galat userID!");
    } else {
        res.status(200).send({ message: `user with ID ${userId} successfully deleted` });
    }
}


// fetch all users
const getAllUsers = async (req, res) => {
    try {
        // paginaton
        let { page, limit, sort, asc } = req.query;
        page = page || 1;
        limit = limit || 3;
        // sort = sort || 'name';
        // asc = asc === 'true';

        const skip = (page - 1) * 3;
        const users = await User.find().sort({ [sort]: asc }).skip(skip).limit(limit);
        res.status(200).send(users);

    }
    catch (error) {
        res.status(500).send({ msg: 'Something wrong with database' });
    };
};

// get all random user hit by third PartyAPI

const getAllRandomUsers = async (req, res) => {
    try {
        // pagination
        let { page, limit, sort, asc } = req.query;
        page = page || 1;
        limit = limit || 10;
        sort= sort || 'username'; 
        const skip = (page - 1) * 10;   

        const randomUsers = await randomUserModel.find().skip(skip).limit(limit).sort({[sort]:asc});
        res.status(200).json(randomUsers);
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
}



// login user
async function login(req, res, next) {
    const { email, password, isAdmin } = req.body;

    // first find user by email
    const user = await User.findOne({ email });
    if (!user) {
        return res.status(401).send({ msg: `couldn't find user with ${email}` });
    }
    // then match the original password with hash password 
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
        return res.status(401).send({ msg: "Invalid User Password" });
    }

    //logout time
    const loginTimeoutDuration = 5 * 60 * 1000; // 2 minute k timer lga
    // const currentTime = new Date().toLocaleTimeString();
    const loginTimeoutTimestamp = new Date().getTime() + loginTimeoutDuration;
    const loginTimeoutTime = new Date(loginTimeoutTimestamp).toLocaleTimeString();

    if (isAdmin === true) {
        const adminToken = generateAdminToken(user);
        const generateTokenTime = new Date().toLocaleTimeString();
        return res.status(200).send({ msg: "Login successfully as Admin", userId: user._id, token: adminToken, tokenTime: generateTokenTime, logoutTime: loginTimeoutTime })
    }
    else {
        const token = generateUserToken(user);
        const generateTokenTime = new Date().toLocaleTimeString();
        res.status(200).send({ msg: "Login Successfully as User", userId: user._id, token: token, tokenTime: generateTokenTime, logoutTime: loginTimeoutTime });

    }
}

//Check if the user is an admin to create,update and delete product
const checkAdmin = async (req, res, next) => {
    try {
        const userId = req.body.userId;
        const user = await User.findById(userId);

        if (!user) {
            return res.status(404).send({ msg: "User not found" });
        }

        if (user.isAdmin) {
            next();
        }
        else {
            res.status(401).send({ msg: "Sorry! Not an admin" });
        }
    }
    catch (error) {
        res.status(500).send({ msg: "Check Admin Error" });
    }
};


//reset password
const resetPassword = async (req, res) => {
    try {
        const { newPassword, confirmPassword } = req.body;
        const email = req.params.email;
        // find user by email
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).send({ msg: `Couldn't find user with email ${email}` });
        }
        // then we compare new and confirm passwords 
        if (newPassword !== confirmPassword) {
            return res.status(400).send({ msg: "New password and confirm password don't match" });
        }

        const hashedPassword = await bcrypt.hash(newPassword, 10);
        user.password = hashedPassword;
        res.status(200).send({ msg: 'Password reset successfully' });
    }
    catch (error) {
        res.send({ msg: "Catch Error!" });
    }


};

module.exports = { createUser, findUser, updateUser, deleteUser, getAllUsers, login, resetPassword, checkAdmin, getAllRandomUsers };
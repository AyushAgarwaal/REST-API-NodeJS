const jwt = require("jsonwebtoken");

// secretkey
const secretkey = "Ayush$12345";

function generateUserToken(user) {
    const payload = {
        email: user.email,
        password: user.password,
        isAdmin: Boolean
    };
    return jwt.sign(payload, secretkey, { expiresIn: "30m" });
};

function generateAdminToken(user) {
    const payload = {
        email: user.email,
        password: user.password,
        isAdmin: Boolean
    };
    return jwt.sign(payload, secretkey, { expiresIn: "30m" });
}

function validateAdminToken(req, res, next) {
    const token = req.headers.token;
    if (!token) {
        return res.status(401).send('token missing');
    }

    try {
        const verify = jwt.verify(token, secretkey);
        if (verify) {
            // req.body.userId = verify;
            next();
        }
        else {

            return res.status(401).send('Unauthorized Admin');
        }
    } 
    catch (error) {

        return res.status(401).send('Invalid token');
    }
}





module.exports = { generateUserToken, generateAdminToken, validateAdminToken };
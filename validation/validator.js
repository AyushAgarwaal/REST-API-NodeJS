const { createUserSchema, updateUserSchema, deleteUserSchema, loginSchema, resetSchema, createProductSchema, deleteProductSchema, updateProductSchema } = require("../validation/ajvschema");
const Ajv = require("ajv");
const ajvFormat = require('ajv-formats');
const ajv = new Ajv({ allErrors: true });
ajvFormat(ajv);

// Create User
const validateCreateUser = (req, res, next) => {
    const validate = ajv.compile(createUserSchema);
    const isValid = validate(req.body);
    if (!isValid) {
        return res.status(400).send({ error: validate.errors });
    }
    next();
}

// validate user to update
const validateUpdateUser = (req, res, next) => {

    const validate = ajv.compile(updateUserSchema);
    const isvalid = validate(req.body);
    if (!isvalid) {
        return res.send({ error: validate.errors }).status(400);
    }
    next();
}

// validate delete user

const validateDeleteUser = (req, res, next) => {
    const validate = ajv.compile(deleteUserSchema);
    const isvalid = validate(req.params);
    if (!isvalid) {
        return res.send({ error: validate.errors }).status(400);
    }
    next();

}

const validateLogin = (req, res, next) => {
    const validate = ajv.compile(loginSchema);
    const isvalid = validate(req.body);
    if (!isvalid) {
        return res.send({ error: validate.errors }).status(400);
    }
    next();
}

// validate forgotten password
const validateResetPassword = (req, res, next) => {
    const validate = ajv.compile(resetSchema);
    const isValid = validate(req.body);
    if (!isValid) {
        return res.send({ error: validate.errors }).status(400);
    }
    next();

}

// validate product created
const validateCreateProduct = (req, res, next) => {
    const validate = ajv.compile(createProductSchema);
    const isValid = validate(req.body);
    if (!isValid) {
        return res.send({ error: validate.errors }).status(400);
    }
    next();

}

// validate delete product
const validateDeleteProduct = (req, res, next) => {
    const validate = ajv.compile(deleteProductSchema);
    const isValid = validate(req.params);
    if (!isValid) {
        return res.status(400).send({ error: validate.errors });
    }
    next();
}

// validate update product
const validateUpdateProduct = (req, res, next) => {
    const validate = ajv.compile(updateProductSchema);
    const isValid = validate(req.body && req.params);
    if (!isValid) {
        return res.status(400).send({ error: validate.errors });
    }
    next();

}

module.exports = { validateCreateUser, validateUpdateUser, validateDeleteUser, validateLogin, validateResetPassword, validateCreateProduct, validateDeleteProduct, validateUpdateProduct };

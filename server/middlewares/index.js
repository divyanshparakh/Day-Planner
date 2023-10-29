const Joi = require("joi");     // Schema validation library that allows to validate nested JSON object.

const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

dotenv.config();


exports.loginUserSchema = Joi.object({
    email: Joi.string()
        .min(6)
        .max(50)
        .trim()
        .lowercase()
        .email({ minDomainSegments: 2, tlds: { allow: ["com", "net", "edu"] } })
        .required()
        .label("User Name")
        .messages({
            "string.email": "Not a valid email address",
            "string.empty": "Email can't be Empty",
        }),
    password: Joi.string().max(100).required().label("Password").messages({
        "string.pattern.base": "Password is Invalid!",
    }),
});


exports.registerUserSchema = Joi.object({
    email: Joi.string()
        .min(6)
        .max(50)
        .trim()
        .lowercase()
        .email({ minDomainSegments: 2, tlds: { allow: ["com", "net", "edu"] } })
        .required()
        .label("User Name")
        .messages({
            "string.email": "Not a valid email address",
            "string.empty": "Email can't be Empty",
        }),
    phoneNumber: Joi.string()
        .length(10)
        .required()
        .label("Phone Number")
        .messages({
            "string.empty": "Phone Number can't be Empty",
        }),
    // oneTimeCode: Joi.string().min(0).max(6).allow(null, "").label("OTP"),
    passwordConfirmation: Joi.any()
        .equal(Joi.ref("password"))
        .required()
        .label("Confirm Password")
        .messages({ "any.only": "Passwords did not match" }),
    password: Joi.string()
        .min(8)
        .max(100)
        .required()
        // .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*\\W)[a-zA-Z0-9\\&S]{8,500}$/)
        .regex(/^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,500}$/)
        .label("Password")
        .messages({
            "string.pattern.base": "Password is not Strong Enough",
        }),
});

exports.verifyToken = function (req, res, next) {
    const token = req.header("authorization");
    if (!token) {
        return res.status(401).json({ message: "Access Denied" });
    }
    else {
        try {
            const verified = jwt.verify(token, btoa(process.env.TOKEN_SECRET));
            req.user = verified;
            next();
        } catch (e) {
            res.status(400).json({ message: "Invalid Token" });
        }
    }
};

// function generateAccessToken(username) {
//     return jwt.sign(username, process.env.TOKEN_SECRET, { expiresIn: '1800s' });
// }

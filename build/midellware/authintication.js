"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.hashing = exports.verify = void 0;
var jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
var bcrypt_1 = __importDefault(require("bcrypt"));
var verify = function (req, res, next) {
    try {
        var headerAuth = req.headers.authorization;
        var token = headerAuth.split(' ')[1];
        // console.log(token)
        jsonwebtoken_1.default.verify(token, process.env.TOKEN_SECRET);
        next();
    }
    catch (error) {
        res.status(401);
        res.json("Access denied invalid token ".concat(error));
        return;
    }
};
exports.verify = verify;
var hashing = function (password) {
    var pepper = process.env.BCRYPT_PASSWWORD;
    var salt = process.env.SALT_ROUNDS;
    var hashPassword = bcrypt_1.default.hashSync(password + pepper, parseInt(salt));
    return hashPassword;
};
exports.hashing = hashing;

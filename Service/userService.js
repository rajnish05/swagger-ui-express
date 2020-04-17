const mongoose = require("mongoose");
// importing user Model
const User = require("../Model/userModel")

// this service used for registering User
exports.userRegisterService = function (payload) {
    return new Promise(function (resolve, reject) {
        User.find({ email: payload.email })
            .then((user) => {
                if(user.length>0) {
                    reject("emailAlreadyExists")
                } else {
                    const newUser = new User({
                        name: payload.name,
                        contact: payload.contact,
                        email: payload.email,
                        password: payload.password
                    })
                    newUser.save()
                        .then((res) => {
                            resolve(res)
                        })
                        .catch((err) => {
                            reject(err)
                        })
                }

            })
    })
}

// This service for login User

exports.userLoginService = function (payload) {
    return new Promise(function (resolve, reject) {
        User.findOne({ email: payload.email, password: payload.password })
            .then((res) => {
                if (res) {
                    resolve(res)
                }
                reject("userNotFound")
            })
            .catch((err) => {
                reject(err)
            })
    })
}
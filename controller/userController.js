// importing Validation file
const validateUser = require("../validation/userValidation")
// importing Service
const userService = require("../Service/userService")

// User Registeration
exports.registerUser = (req, res) => {
    // validate User register request
    const { errors, isValid } = validateUser.userRegisterValidation(req.body);
    if (!isValid) {
        return res.status(400).send(errors);

    }
    // calling User Registration Service
    userService.userRegisterService(req.body)
        .then(result => {  

            return res.status(200).send({message:"Registration Success",data:result});
        })
        .catch(err => {
            if(err = "emailAlreadyExists"){
                return res.status(409).send({message:"Provided Email is already Exists", data: err });

            }else{
                return res.status(500).send({message:"Internal Server Error", data: err });

            }
        })

};

// User Login
exports.loginUser = (req, res) => {
    // Validating login user Request
    const { errors, isValid } = validateUser.userLoginValidation(req.body);
    if(!isValid) {
        return res.status(400).send(errors);
    }
    // calling user Login Service
    userService.userLoginService(req.body)
        .then(result => {
            var data = result;
            return res.status(200).json({message:"Success",data:data});
        })
        .catch(err => {
                if(err =="userNotFound"){
                    return res.status(404).send({ message:"User Not Found",data: err });
                }
                else{
                    return res.status(500).send({message:"Internal Server Error", data: err });
                }
        })

};
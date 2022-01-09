const Joi = require('@hapi/joi');

//Register Validation
// the data will be the req.body that we will get from the postman 
const registerValidation = (data) =>{
    const schema = Joi.object({
        name:Joi.string()
                .min(6)
                .max(255)
                .required(),
        email:Joi.string()
                 .min(6)
                 .max(255)
                 .required(),
        password:Joi.string()
                    .min(6)
                    .max(1024)
                    .required()
    });
    const validation = schema.validate(data);
    return validation;
   // return Joi.Validate(data,schema); This won't work in newer version
};

//Login Validation
//For login we don't need name, we just need email and password
const loginValidation = (data) =>{
    const schema = Joi.object ({
        email:Joi.string()
                 .min(6)
                 .max(1024)
                 .required(),
        password:Joi.string()
                    .min(6)
                    .max(1024)
                    .required()
    });
    const validation = schema.validate(data);
    return validation;
    // return Joi.Validate(data,schema); This won't work in newer version
};

//exporting them separately so that we can access them separately as needed
module.exports.registerValidation = registerValidation;
module.exports.loginValidation = loginValidation;


import joi from "joi";

export const userRegistrationSchema = joi.object({
  username: joi.string().required().min(3),
  email: joi
    .string()
    .trim()
    .lowercase()
    .email({ minDomainSegments: 2, tlds: { allow: ["com", "net", "org"] } }),
  password: joi.string().min(6).pattern(new RegExp( /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/)),
});

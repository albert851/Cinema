import mongoose from "mongoose";
import Joi, { boolean } from "joi";
import { joiPasswordExtendCore } from "joi-password";

const joiPassword = Joi.extend(joiPasswordExtendCore);

const AdminSchema = new mongoose.Schema({
  email: {
    type: String,
    unique: true,
    requierd: [true, "admin must have email"],
  },
  password: String,
});

const AdminModel = mongoose.model("admin", AdminSchema);

export default AdminModel;

export const AdminValidation = Joi.object({
  email: Joi.string().email().required(),
  password: joiPassword
    .string()
    .min(4)
    .max(16)
    .minOfSpecialCharacters(1)
    // .minOfLowercase(1)
    // .minOfUppercase(1)
    // .minOfNumeric(1)
    // .noWhiteSpaces()
    .required(),
  repeatPassword: Joi.ref("password"),
});
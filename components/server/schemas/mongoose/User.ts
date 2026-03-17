import bcrypt from "bcrypt";
import crypto from "crypto";
import jwt from "jsonwebtoken";
import mongoose, {
  HydratedDocument,
  InferSchemaType,
  Schema
} from "mongoose";

import { hashValue } from "../../utils/bcrypt/hashValue";
import { compareValue } from "../../utils/bcrypt/compareValue";
import { JWT_SECRET } from "../../constants/env-keys";

const userSchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  status: {
    type: String,
    default: "Offline"
  },
  password: {
    type: String,
    required: true
  },
  avatar: {
    type: String,
    required: true
  },
  picture: {
    public_id: {
      type: String
    },
    url: {
      type: String
    },
    signed_url: {
      type: String
    }
  },
  role: {
    type: String,
    default: "User"
  },
  verified: {
    type: Boolean,
    required: true,
    default: false
  },
  resetPasswordToken: String,
  resetPasswordExpire: Date
},
{ timestamps: true });

userSchema.pre("save", async function(){
  if(!this.isModified("password")){ // If password was not modified
    return;
  }
  this.password = await hashValue(this.password);
  return;
});

userSchema.methods.getJwtToken = function(){
  return jwt.sign({
    id: this._id,
    name: this.name,
    email: this.email,
    avatar: this.avatar,
    picture: {
      public_id: this.picture?.public_id,
      url: this.picture?.url,
      signed_url: this.picture?.signed_url
    }
  },
  JWT_SECRET,
  { expiresIn: "7d" }
  );
};

userSchema.methods.comparePassword = async function(val: string){
  return compareValue(val, this.password);
};

userSchema.methods.compareNewPassword = async function(enteredPassword: string){
  return await bcrypt.compare(enteredPassword, this.password);
};

userSchema.methods.getResetPasswordToken = function(){
  const resetToken = crypto.randomBytes(20).toString("hex");
  
  this.resetPasswordToken = crypto
  .createHash("sha256")
  .update(resetToken)
  .digest("hex"); // Token encryption

  this.resetPasswordExpire = Date.now() + 30 * 60 * 1000 // Token expiration time
  return resetToken;
}

userSchema.methods.omitPassword = function(){
  const user = this.toObject();
  delete user.password;
  return user;
};

export type User = InferSchemaType<typeof userSchema>;
export type UserDocument = HydratedDocument<User>;

const UserModel = mongoose.models["User"]
?? mongoose.model<User>(
  "User",
  userSchema,
  "users"
);

export default UserModel;
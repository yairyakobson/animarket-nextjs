import mongoose, { QueryOptions, UpdateQuery } from "mongoose";

import User from "../schemas/mongoose/User";

export const registerUser = async(email: string, name: string) =>{
  return await User.findOne({
    $or: [{ email }, { name }]
  });
}

export const loginUser = async(email: string) =>{
  return await User.findOne({ email });
}

export const fetchUser = async(query: string) =>{
  return await User.findById(query).select("-password");
}

export const userStatus = async(query: string, status: string) =>{
  return await User.findByIdAndUpdate(query, { status });
}

export const updateUserPassword = async(query: string) =>{
  return await User.findById(query);
}

export const updateUserStatus = async(
  query: mongoose.Types.ObjectId,
  verified: UpdateQuery<typeof User>,
  newStatus: QueryOptions<typeof User>
) =>{
  return await User.findByIdAndUpdate(query, verified, newStatus);
}

export const uploadUserImage = async(
  userId: string,
  image: {
    public_id: string,
    url: string,
    signed_url: string
  }
) =>{
  if(!mongoose.Types.ObjectId.isValid(userId)){
    throw new Error("Invalid User ID format");
  }

  return await User.findOneAndUpdate(
    { _id: new mongoose.Types.ObjectId(userId) },
    {
      $set: {
        picture: {
          public_id: image.public_id,
          url: image.url,
          signed_url: image.signed_url
        }
      }
    },
    { returnDocument: "after", runValidators: true }
  );
}

export const deleteUserImage = async(
  userId: string
) =>{
  return await User.findOneAndUpdate(
    { _id: new mongoose.Types.ObjectId(userId) },
    { $unset: { picture: "" } },
    { returnDocument: "after" }
  );
}
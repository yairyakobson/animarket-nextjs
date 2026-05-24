"use server"

import { revalidatePath } from "next/cache";
import { delete_file } from "../aws/aws-delete";
import { upload_file } from "../aws/aws-upload";

import { deleteUserImage, uploadUserImage } from "../../dataAccess/users";
import { updateUserCookie } from "../cookies/updateCookie";

export async function profileImageAction(
  formData: FormData,
  userId: string
){
  try{
    const mode = formData.get("mode") as string;
    const oldKey = formData.get("oldKey") as string;
    let updatedUser;
    
    if(mode === "delete"){
      if(oldKey && oldKey !== "null"){
        await delete_file(oldKey);
      }
      updatedUser = await deleteUserImage(userId);
      
      if(updatedUser){
        await updateUserCookie(updatedUser);
      }
    }
    else{
      const file = formData.get("image") as File;
      const arrayBuffer = await file.arrayBuffer();
      const buffer = Buffer.from(arrayBuffer);

      // 1. Upload new
      const res = await upload_file(
        buffer,
        file.name,
        file.type,
        `Demo/${userId}`
      );
      
      // 2. Update MongoDB
      updatedUser = await uploadUserImage(userId, {
        public_id: res.public_id,
        url: res.url,
        signed_url: res.signed_url
      });

      // 3. Cleanup old
      if(updatedUser
        && oldKey
        && oldKey !== "null"
      ){
        await delete_file(oldKey);
      }

      if(updatedUser){
        await updateUserCookie(updatedUser);
      }
    }

    revalidatePath("/");
    return{
      success: true,
      user: updatedUser
    };
  }
  catch(error){
    console.error("Action Error:", error);
    return{
      success: false,
      message: error instanceof Error
      ? error.message : "Unknown error"
    };
  }
}
import { DeleteObjectCommand } from "@aws-sdk/client-s3";

import { PRIMARY_BUCKET } from "../../constants/env-keys";
import { s3Client } from "./aws-utility";

export const delete_file = async(file: string): Promise<boolean | undefined> =>{
  const params = {
    Bucket: PRIMARY_BUCKET,
    Key: file
  };

  try{
    const command = new DeleteObjectCommand(params);
    await s3Client.send(command);
    return true;
  }
  catch(error){
    console.error("Error deleting file:", error);
    throw new Error("Failed to delete file");
  }
};
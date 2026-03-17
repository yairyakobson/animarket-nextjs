import { PutObjectCommand, GetObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

import { PRIMARY_AWS_REGION, PRIMARY_BUCKET } from "../../constants/env-keys";
import { UploadResponse } from "./aws-interface";
import { s3Client } from "./aws-utility";

export const upload_file = async(
  buffer: Buffer, 
  file: string, 
  mimeType: string, 
  folder: string
): Promise<UploadResponse> =>{
  const keyDirectory = `${folder}/${Date.now()}_${file}`
  const params = {
    Bucket: PRIMARY_BUCKET,
    Key: keyDirectory,
    Body: buffer,
    ContentType: mimeType,
    ContentDisposition: "inline", // Ensure the image is displayed in the browser
  }

  try{
    const command = new PutObjectCommand(params);
    await s3Client.send(command);

    const signedUrlParams = {
      Bucket: PRIMARY_BUCKET,
      Key: keyDirectory,
      Expires: 60 * 5
    };
    const signedUrl = await getSignedUrl(
      s3Client,
      new GetObjectCommand(signedUrlParams),
      { expiresIn: 60 * 5 }
    );

    return{
      public_id: keyDirectory,
      url: `https://${PRIMARY_BUCKET}.s3.${PRIMARY_AWS_REGION}.amazonaws.com/${keyDirectory}`,
      signed_url: signedUrl
    };
  }
  catch(error){
    throw new Error(`Failed to upload file: ${error}`);
  }
}
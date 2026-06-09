"use server";

import { revalidatePath } from "next/cache";

import { CONFLICT, INTERNAL_SERVER_ERROR } from "../../constants/httpCodes";

import { upload_file } from "../aws/aws-upload";
import { duplicatorFinder } from "../../dataAccess/products";

export async function productImageAction(
  formData: FormData,
  productData: {
    productName: string,
    productSeller: string,
    productImage: string,
  },
  image: {
    public_id: string;
    url: string;
    signed_url: string
  }
){

  try{
    const { productName, productSeller, productImage } = productData;

    const existing = await duplicatorFinder(productName);

    if(existing){
      return{ 
        success: false, 
        error: CONFLICT, 
        message: "This product name is used by another user" 
      };
    }
    
    const match = productImage.match(/^data:(image\/\w+);base64,(.+)$/);
    if(!match) return null;
    
    const [_, mimeType, base64Data] = match;
    const buffer = Buffer.from(base64Data, "base64")
    const file = formData.get("image") as File;
    const fileName = file?.name || `upload.${mimeType.split("/")[1]}`;

    const result = await upload_file(
      buffer,
      fileName,
      mimeType,
      `Misc/${productSeller}/${productName}`
    );
    revalidatePath("/");
    
    return{
      public_id: result.public_id || image.public_id,
      url: result.url || image.url,
      signed_url: result.signed_url || image.signed_url
    };
  }
  catch(error){
    console.error("S3 Upload Error:", error);
    return{ 
      success: false, 
      error: INTERNAL_SERVER_ERROR, 
      message: "Image processing failed" 
    };
  }
}
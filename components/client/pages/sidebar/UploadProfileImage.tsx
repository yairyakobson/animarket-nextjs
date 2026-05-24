"use client"

import { useRef } from "react";

import { UploadImageProps } from "../../clientInterfaces/formInterfaces/uploadImageProps";

import { profileImageAction } from "@/components/server/utils/actions/imageAction";
import { useAppSelector } from "../../hooks/useAppSelector";

import UploadProfileImageForm from "../../forms/uploadProfileImageForm";

const UploadProfileImage = ({ initialUser }: UploadImageProps) =>{
  const selectedFileRef = useRef<{
    public_id: string;
    image: File | null;
  }>({
    public_id: initialUser?.public_id || "",
    image: null
  });
  
  const { user: reduxUser } = useAppSelector((state) => state.user);
  const activeUserId = reduxUser?.id || initialUser?.id;

  const inputHandler = (e: React.ChangeEvent<HTMLInputElement>) =>{
    const selectedFile = e.target.files?.[0];
    if(selectedFile){
      selectedFileRef.current.image = selectedFile;
    }
  };

  const onUpload = async() =>{
    const newImageKey = initialUser?.public_id
    || reduxUser?.public_id;

    if(!selectedFileRef.current.image || !activeUserId){
      console.error("Missing File or User ID");
      return;
    }

    const formData = new FormData();
    formData.append("image", selectedFileRef.current.image);
    formData.append("mode", "upload");

    if(newImageKey && newImageKey !== "temp"){ 
      formData.append("oldKey", newImageKey);
    }

    // This handles both Upload and Update
    const result = await profileImageAction(formData, activeUserId);

    if(result?.success && result?.user){
      selectedFileRef.current.image = null;
    }
    else{
      throw new Error(result?.message || "Upload failed");
    }
    return result;
  };

  const onDelete = async() =>{
    const oldImageKey = initialUser?.public_id
    || reduxUser?.public_id;

    if(!activeUserId || !oldImageKey) return;

    const formData = new FormData();
    formData.append("mode", "delete");
    formData.append("oldKey", oldImageKey);
    
    const result = await profileImageAction(formData, activeUserId);
    return result;
  };

  return(
    <>
      <UploadProfileImageForm
      initialUser={initialUser}
      fileHandler={inputHandler}
      handleUpload={onUpload}
      handleDelete={onDelete}/>
    </>
  );
}

export default UploadProfileImage;
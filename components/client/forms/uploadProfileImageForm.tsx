import { useRouter } from "next/navigation";
import { useRef } from "react";
import { Button, Image } from "react-bootstrap";
import { IoMdAdd, IoMdTrash } from "react-icons/io";
import { toast } from "sonner";

import { UploadImageFunctions } from "../clientInterfaces/formInterfaces/uploadImageFunctions";
import { useAppSelector } from "../hooks/useAppSelector";
import { useOptimisticUpdate } from "../hooks/useOptimisticUpdate";

import uploadImageStyles from "../styles/uploadImage.module.scss";

const UploadProfileImageForm = ({
  initialUser,
  fileHandler,
  handleUpload,
  handleDelete
}: UploadImageFunctions) =>{
  const fileInputRef = useRef<HTMLInputElement>(null);

  const router = useRouter();
  const { user } = useAppSelector((state) => state.user);
  const resolvedUser = user ?? initialUser;

  const {
    displayImage,
    imgPreview,
    isProcessing,
    isReverting,
    stageFile,
    stageRemoval,
    commitChanges
  } = useOptimisticUpdate(resolvedUser, handleUpload, handleDelete);

  const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if(!file) return;
    fileHandler(e);

    const reader = new FileReader();
    reader.onload = () =>{
      if(reader.readyState === 2){
        stageFile(reader.result as string);
      }
    };
    reader.readAsDataURL(file);
  };

  const handleImageAction = async() =>{
    try{
      await commitChanges();
      toast.success("Image updated successfully", {
        duration: 2000
      });
      router.push(`/profile/${user?.name}`);
    }
    catch(e){
      toast.error("Update failed", {
        duration: 2000
      });
    }
  };

  return(
    <>
      <section
      className={`${uploadImageStyles.uploadImageContainer} ${uploadImageStyles.narrow}`}>
        <h5>Upload Image</h5>
        <input
        type="file"
        ref={fileInputRef}
        hidden
        onChange={onFileChange}
        accept="image/*"/>
        <section className={uploadImageStyles.imageWrapper}>
          <Image src={displayImage}
          key={displayImage}
          alt={`${resolvedUser?.name}`}
          className={uploadImageStyles.image}/>
          {(imgPreview || (!!resolvedUser?.url && !isReverting)) ? (
            <IoMdTrash
            className={uploadImageStyles.removeIcon}
            onClick={stageRemoval}/>
            ) : (
            <IoMdAdd 
            className={uploadImageStyles.addIcon} 
            onClick={() => fileInputRef.current?.click()}/>
          )}
        </section>

        <Button type="button" variant="danger"
        disabled={isProcessing}
        onClick={handleImageAction}>
          {isProcessing ? "Processing..." : "Save Changes"}
        </Button>
      </section>
    </>
  );
}

export default UploadProfileImageForm;
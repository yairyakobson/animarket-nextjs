import { useCallback, useState } from "react";
import { useDispatch } from "react-redux";

import { setUser } from "../redux/features/userSlice";

export const useOptimisticUpdate = (
  resolvedUser: any,
  handleUpload: () => Promise<void>,
  handleDelete: () => Promise<void>
) =>{
  const [imgPreview, setImgPreview] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isReverting, setIsReverting] = useState(false);

  const dispatch = useDispatch();

  const currentSource = resolvedUser?.picture?.url || resolvedUser?.avatar;

  const displayImage = imgPreview
  ? imgPreview
  : (isReverting ? resolvedUser?.avatar : currentSource);

  const stageFile = useCallback((readerResult: string) =>{
    setImgPreview(readerResult);
    setIsReverting(false);
  }, []);

  const stageRemoval = useCallback(() =>{
    setImgPreview(null);
    if(resolvedUser?.picture?.url){
      setIsReverting(true);
    }
  }, [resolvedUser]);

  const commitChanges = async () =>{
    setIsProcessing(true);
    const previousUserData = { ...resolvedUser };

    try{
      if(isReverting){
        dispatch(setUser({
          ...resolvedUser,
          picture: undefined
        }));
        await handleDelete();
      }
      else if(imgPreview){
        dispatch(setUser({
          ...resolvedUser,
          picture: {
            public_id: "temp",
            url: imgPreview
        }}));
        await handleUpload();
        setImgPreview(null);
      }
      return { success: true }
    }
    catch(error){
      dispatch(setUser(previousUserData));
      throw error; 
    }
    finally{
      setIsProcessing(false);
    }
  };

  return{
    displayImage,
    imgPreview,
    isProcessing,
    isReverting,
    stageFile,
    stageRemoval,
    commitChanges
  };
};
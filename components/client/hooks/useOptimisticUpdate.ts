import { useCallback, useState } from "react";
import { useDispatch } from "react-redux";

import { ActionResponse } from "../clientInterfaces/actionInterface";

import { setUser } from "../redux/features/userSlice";
import { UserQueryData } from "../clientInterfaces/userQueryInterface";

export const useOptimisticUpdate = (
  resolvedUser: any,
  handleUpload: () => Promise<ActionResponse>,
  handleDelete: () => Promise<ActionResponse>
) =>{
  const [imgPreview, setImgPreview] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isReverting, setIsReverting] = useState(false);

  const dispatch = useDispatch();

  const currentSource = resolvedUser?.url || resolvedUser?.avatar;

  const displayImage = imgPreview
  ? imgPreview
  : (isReverting ? resolvedUser?.avatar : currentSource);

  const stageFile = useCallback((readerResult: string) =>{
    setImgPreview(readerResult);
    setIsReverting(false);
  }, []);

  const stageRemoval = useCallback(() =>{
    setImgPreview(null);
    if(resolvedUser?.url){
      setIsReverting(true);
    }
  }, [resolvedUser]);

  const commitChanges = async () =>{
    setIsProcessing(true);
    const previousUserData = { ...resolvedUser };

    try{
      if(isReverting){
        await handleDelete();
        setImgPreview(null);
        dispatch(setUser({
          ...resolvedUser,
          url: ""
        }));
      }
      else if(imgPreview){
        const localPreview = imgPreview;
        dispatch(setUser({
          ...resolvedUser,
          url: localPreview
        }));

        const response = await handleUpload();

        if(response?.success && response?.user){
          setImgPreview(null);
          const sanitizedUser = JSON.parse(JSON.stringify(response?.user))
          dispatch(setUser(sanitizedUser as UserQueryData));
        }
        else{
          dispatch(setUser(previousUserData));
          setImgPreview(null);
        }
      }
      return { success: true }
    }
    catch(error){
      dispatch(setUser(previousUserData));
      setImgPreview(null);
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
import { UserQueryData } from "../userQueryInterface";

export interface UploadImageProps{
  initialUser: UserQueryData | null;
}

export interface UploadImageFunctions extends UploadImageProps{
  fileRef?: React.RefObject<{
    public_id: string;
    image: File | null;
  }>;
  
  fileHandler: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleUpload: () => Promise<void>;
  handleDelete: () => Promise<void>;
}
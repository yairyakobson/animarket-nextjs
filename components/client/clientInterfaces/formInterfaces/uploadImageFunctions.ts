import { UserQueryData } from "../userStateInterfaces/userQueryData";

export interface UploadImageFunctions{
  initialUser: UserQueryData | null;
  fileHandler: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleUpload: () => Promise<any>;
  handleDelete: () => Promise<any>;
}
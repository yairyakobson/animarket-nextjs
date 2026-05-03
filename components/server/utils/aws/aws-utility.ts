import { S3Client } from "@aws-sdk/client-s3";
import {
  PRIMARY_AWS_REGION,
  AWS_ACCESS_KEY_ID,
  AWS_SECRET_ACCESS_KEY
} from "../../constants/env-keys";

export const s3Client = new S3Client({
  region: PRIMARY_AWS_REGION,
  credentials: {
    accessKeyId: AWS_ACCESS_KEY_ID,
    secretAccessKey: AWS_SECRET_ACCESS_KEY
  }
});
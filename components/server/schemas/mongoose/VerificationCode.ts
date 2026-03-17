import mongoose, {
  HydratedDocument,
  InferSchemaType,
  Schema
} from "mongoose";

const verificationCodeSchema = new Schema({
  name: {
    ref: "User",
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    index: true
  },
  type: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    required: true,
    default: Date.now
  },
  expiresAt: {
    type: Date,
    required: true
  }
});

// Schema-based interface
export type VerificationCode = InferSchemaType<typeof verificationCodeSchema>;
export type VerificationCodeDocument = HydratedDocument<VerificationCode>;

const VerificationCodeModel = mongoose.models["Verification-Code"]
?? mongoose.model<VerificationCode>(
  "Verification-Code",
  verificationCodeSchema,
  "verification-code-list"
);

export default VerificationCodeModel;
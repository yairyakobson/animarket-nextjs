import { getEnv } from "./env-config";

export const APP_ORIGIN = getEnv("APP_ORIGIN");
export const JWT_SECRET = getEnv("JWT_SECRET");
export const JWT_REFRESH_SECRET = getEnv("JWT_REFRESH_SECRET");
export const COOKIE_EXPIRATION_TIME = getEnv("COOKIE_EXPIRATION_TIME");

export const PRIMARY_AWS_REGION = getEnv("PRIMARY_AWS_REGION");
export const AWS_ACCESS_KEY_ID = getEnv("AWS_ACCESS_KEY_ID");
export const AWS_SECRET_ACCESS_KEY = getEnv("AWS_SECRET_ACCESS_KEY");
export const PRIMARY_BUCKET = getEnv("PRIMARY_BUCKET");

export const PLACEHOLDER_URL = getEnv("PLACEHOLDER_URL");

export const NODE_ENV = getEnv("NODE_ENV", "development");
export const DATABASE_URL = getEnv("DATABASE_URL");

export const OAUTH_CLIENT_ID = getEnv("OAUTH_CLIENT_ID");
export const OAUTH_CLIENT_SECRET = getEnv("OAUTH_CLIENT_SECRET");
export const OAUTH_REFRESH_TOKEN = getEnv("OAUTH_REFRESH_TOKEN");

export const SMTP_EMAIL = getEnv("SMTP_EMAIL");
export const SMTP_FROM_NAME = getEnv("SMTP_FROM_NAME");
export const SMTP_FROM_EMAIL = getEnv("SMTP_FROM_EMAIL");
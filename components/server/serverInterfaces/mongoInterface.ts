interface MongoServerError extends Error{
  code: number;
  keyValue?: Record<string, any>;
}
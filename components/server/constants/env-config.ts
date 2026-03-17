// Checks if our MONGO_URI is valid (string) or undefined (not found, missing or wrong uri)
export const getEnv = (key: string, defaultValue?: string): string =>{
  const value = process.env[key] || defaultValue;

  if(value === undefined){
    throw new Error(`Missing Environment Variable ${key}`)
  }
  return value;
}
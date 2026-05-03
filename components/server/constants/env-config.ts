// Checks if enviroment variables are missing
export const getEnv = (key: string, defaultValue?: string): string =>{
  const value = process.env[key] || defaultValue;

  if(value === undefined){
    throw new Error(`Missing Environment Variable ${key}`)
  }
  return value;
}
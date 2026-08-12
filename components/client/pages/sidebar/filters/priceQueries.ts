import { ReadonlyURLSearchParams } from "next/navigation";

export const getPriceQueryParams = (
  currentSearchParams: URLSearchParams | ReadonlyURLSearchParams,
  updates: Record<string, string | null | undefined>
): string =>{
  const params = new URLSearchParams(currentSearchParams.toString());

  Object.entries(updates).forEach(([key, value]) =>{
    const trimmed = value?.trim();
    if(trimmed){
      params.set(key, trimmed);
    }
    else{
      params.delete(key);
    }
  });
  return params.toString();
};
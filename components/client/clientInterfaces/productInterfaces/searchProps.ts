export interface ProductSearchProps{
  params: Promise<{ query: string; }>;
  searchParams: Promise<{ [key: string]: string | undefined }>;
}
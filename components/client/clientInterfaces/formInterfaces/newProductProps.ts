export interface NewProductProps{
  productDataHandler: (event: React.ChangeEvent<HTMLInputElement
    | HTMLTextAreaElement
    | HTMLSelectElement>
  ) => void;
  
  newProductRef: React.RefObject<{
    name: string;
    description: string;
    price: string;
    stock: string;
    category: string;
    condition: string;
  }>
}
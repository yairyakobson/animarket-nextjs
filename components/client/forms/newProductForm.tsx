import { useRouter } from "next/navigation";
import { useState } from "react";
import { Button, Col, Container, FloatingLabel, Form, Image, Row } from "react-bootstrap";
import { toast } from "sonner";

import { PRODUCT_CATEGORIES, PRODUCT_CONDITION } from "../constants/productConstants";

import { NewProductProps } from "../clientInterfaces/formInterfaces/newProductProps";
import { useCreateProductMutation } from "../redux/services/productApi";
import { useAppSelector } from "../hooks/useAppSelector";
import { productImageAction } from "@/components/server/utils/actions/productImageAction";

const NewProductForm: React.FC<NewProductProps> = ({
  productDataHandler,
  newProductRef
}) =>{
  const { current: product } = newProductRef;
  const {
    name,
    description
  } = product;

  const [_, setImage] = useState<string | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const router = useRouter();

  const { user } = useAppSelector((state) => state.user);

  const [createProduct, { error, isLoading }] = useCreateProductMutation();
  console.log("Error:", error);

  const validateProductImage = (e: React.ChangeEvent<HTMLInputElement>) =>{
    const file = e?.target?.files?.[0];
    if(!file) return;

    const reader = new FileReader();
    reader.onload = () =>{
      if(reader?.readyState === 2 && typeof reader?.result === "string"){
        setImagePreview(reader?.result);
        setImage(reader?.result);
      }
    };
    reader.readAsDataURL(file);
  }

  const createProductHandler = async(e: React.SubmitEvent<HTMLFormElement>) =>{
    e.preventDefault();

    try{
      const formData = new FormData(e.currentTarget);

      const uploadImage = await productImageAction(
        formData,
        {
          productName: `${product?.name}`,
          productSeller: `${user?.name}`,
          productImage: imagePreview || ""
        },
        {
          public_id: `${`loading ${product?.name} public_id`}`,
          url: `${`loading ${product?.name} url`}`,
          signed_url: `${`loading ${product?.name} public_id`}`
        }
      );

      if(uploadImage?.success === false){
        toast.error(uploadImage.message, {
          duration: 2000
        });
        return;
      }

      const payload = {
        ...newProductRef.current,
        ...uploadImage,
        price: product?.price,
        stock: product?.stock,
        seller: user?.name as string,
        image: {
          public_id: uploadImage?.public_id,
          url: uploadImage?.url,
          signed_url: uploadImage?.signed_url
        }
      }
      await createProduct(payload).unwrap();

      toast.success("Product created successfully!", {
        duration: 1000
      });
      router.push("/profile/my_products");
    }
    catch(error: unknown){
      const err = error as { data?: { error: string } };
      toast.error(err.data?.error || "Something went wrong", {
        duration: 2000
      });
    }
  };

  return(
    <>
      <Container>
        <h1 className="text-center mt-4">Create New Product</h1>
        <Row as="section">
          <Col as="section"
          xl={{ span: 6, offset: 3 }}
          className="mt-4 !shadow-[0_2px_8px_rgba(0,0,0,0.15)]">
            <Form onSubmit={createProductHandler}
            className="py-3 mx-2">

            <FloatingLabel label="Product Name">
              <Form.Control type="text"
              name="name"
              placeholder="Product Name"
              defaultValue={name}
              onChange={productDataHandler}
              required/>
            </FloatingLabel>

            <Form.Label className="mt-2"/>
              <Form.Control as="textarea"
              rows={4}
              name="description"
              placeholder="Description"
              defaultValue={description}
              onChange={productDataHandler}
              required/>

                <Row as="section">
                  <Col as="section">
                    <FloatingLabel className="mt-4" label="Price">
                      <Form.Control type="number"
                      name="price"
                      defaultValue=""
                      onChange={productDataHandler}
                      required
                      min={1}
                      step="0.05"/>
                    </FloatingLabel>
                  </Col>

                  <Col as="section">
                    <FloatingLabel className="mt-4" label="Stock">
                      <Form.Control type="number"
                      name="stock"
                      defaultValue=""
                      onChange={productDataHandler}
                      required
                      min={1}
                      step="0.05"/>
                    </FloatingLabel>
                  </Col>
                </Row>

              <FloatingLabel className="mt-4" label="">
                <Form.Select
                className="!pt-[0.625rem] !pl-[0.75rem]"
                name="category"
                defaultValue=""
                onChange={productDataHandler}
                required>
                <option value="" disabled>Category</option>
                {PRODUCT_CATEGORIES?.map((category) =>(
                  <option key={category} value={category}>{category}</option>
                ))}
                </Form.Select>
              </FloatingLabel>

              <FloatingLabel className="mt-4" label="">
                <Form.Select
                className="!pt-[0.625rem] !pl-[0.75rem]"
                name="condition"
                defaultValue=""
                onChange={productDataHandler}
                required>
                <option value="" disabled>Condition</option>
                {PRODUCT_CONDITION?.map((condition) =>(
                  <option key={condition} value={condition}>{condition}</option>
                ))}
                </Form.Select>
              </FloatingLabel>

              <Form.Group className="mt-4">
                <Form.Control type="file"
                name="url"
                onChange={validateProductImage}
                accept="image/*"
                required/>
              </Form.Group>
                {imagePreview && (
                  <Image
                  src={imagePreview}
                  alt="Product Image"
                  className="mt-3 mr-2"
                  width={55}
                  height={52}/>
                )}
              <br/>
              <Button type="submit"
              className="btn-danger !w-full"
              disabled={isLoading}>Publish</Button>
            </Form>
          </Col>
        </Row>
      </Container>
    </>
  )
}

export default NewProductForm;
import React, { useEffect, useState } from "react";
import { Avatar, Button, Card, CardBody, Typography } from "@material-tailwind/react";
import { EnvelopeIcon, PhoneIcon, MapPinIcon } from "@heroicons/react/24/solid";
import supabaseRequest from "../../../../services/api/supabaseRequest";
import DefaultSkeleton from "../DefaultSkeleton";
import supabase from "../../../../services/supabase";

export default function DetailsAppointmentsProducts({ id }) {
  const [isLoading, setIsLoading] = useState(true);
  const [appointmentProduct, setAppointmentProduct] = useState(null);
  const [products, setProducts] = useState([]);
  const [cartItems, setCartItems] = useState([]);
  const fetchSupplierStock = async (supplierId) => {
    try {
        const appointmentProductData = await supabaseRequest({
            table: "view_products_details",
            method: "GET",
            filters: { id_suppliers: `eq.${supplierId}` }
        });
        setProducts(appointmentProductData);
        console.log(appointmentProductData);
    } catch (error) {
      console.error("Erro ao buscar estoque do fornecedor:", error.message);
      return null;
    }
  };

  const fetchAppointmentProduct = async (appointmentId) => {
    try {
      const appointmentProductData = await supabaseRequest({
        table: "view_appointment_products",
        method: "GET",
        filters: { appointment_product_id: `eq.${appointmentId}` },
        limit: 1,
      });

      if (appointmentProductData && appointmentProductData.length > 0) {
        const product = appointmentProductData[0];
        setAppointmentProduct(product);
        // Buscar o estoque do fornecedor
        const stockData = await fetchSupplierStock(product.suppliers_id);
      }
    } catch (error) {
      console.error("Erro ao buscar agendamento ou estoque:", error.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (id) {
      fetchAppointmentProduct(id);
    }
  }, [id]);

  if (isLoading) {
    return <DefaultSkeleton />;
  }

  if (!appointmentProduct) {
    return <Typography color="red">Agendamento não encontrado!</Typography>;
  }

  const handleAddToCart = (product) => {    
    const products = {
        id: product.id,
        ean: product.ean,
        color_name: product.color_name,
        product_material: product.product_material,
        product_brand_name: product.product_brand_name,
        key_products_view: product.key_products_view,
        product_name: product.product_name,
        product_photo_url: product.product_photo_url,
        quantity: 1
    };

    setCartItems((prevItems) => {
        // Verificar se o produto já está no carrinho
        const existingProduct = prevItems.find(
          (item) => item.key_products_view === product.key_products_view
        );
    
        if (existingProduct) {
          // Atualizar a quantidade se já existir
          return prevItems.map((item) =>
            item.key_products_view === product.key_products_view
              ? { ...item, quantity: item.quantity + 1 }
              : item
          );
        }
    
        // Adicionar novo produto com quantidade 1
        return [...prevItems, { ...products, quantity: 1 }];
      });
  };

  const handleRemoveFromCart = (product) => {
    console.log(product);
    const existingProduct = cartItems.find((item) => item.key_products_view == product
    );
    if(existingProduct.quantity > 1){
        existingProduct.quantity = existingProduct.quantity - 1;
        setCartItems([...cartItems, existingProduct]);
        return
    }
    if(existingProduct.quantity === 1){
        existingProduct.quantity = existingProduct.quantity - 1;
        const removerCart = cartItems.filter((item) => item.key_products_view !== product);
        setCartItems([...cartItems, removerCart]);
        return
    }
  };

  return (
    <div>
        <Card>
        <CardBody className="text-center">
            <Typography variant="h4" color="blue-gray" className="mb-2">
            {appointmentProduct.suppliers || "Fornecedor não informado"}
            </Typography>
            <div className="flex flex-col items-center gap-4 mt-6">
            <div className="flex items-center gap-2">
                <EnvelopeIcon className="h-5 w-5 text-blue-500" />
                <Typography color="blue-gray">
                {appointmentProduct.email || "Sem e-mail"}
                </Typography>
            </div>
            <div className="flex items-center gap-2">
                <PhoneIcon className="h-5 w-5 text-green-500" />
                <Typography color="blue-gray">
                {appointmentProduct.phone || "Sem telefone"}
                </Typography>
            </div>
            <div className="flex items-center gap-2">
                <MapPinIcon className="h-5 w-5 text-red-500" />
                <Typography color="blue-gray">{"Endereço não implementado"}</Typography>
            </div>
            </div>
        </CardBody>
        
        </Card>
        <br></br>
        <div className=" w-full flex flex-row items-center justify-center flex-wrap">
            {products &&  products.map((product) =>(
                <Card key={product.key_products_view} className="border border-gray-200 m-5 p-2">
                    <CardBody className="text-center">
                        {product.product_photo_url && (
                        <Avatar
                            src={product.product_photo_url}
                            alt={product.product_name}
                            size="xl"
                            variant="rounded"
                            className="mb-4"
                            />
                        )}  
                    
                        <Typography variant="h4" color="blue-gray" className="mb-2">
                        {product.product_name || "Produto nao informado"}
                        </Typography>
                        <div className="flex flex-col items-center gap-4 mt-6">
                        <div className="flex items-center gap-2">
                            <Typography color="blue-gray">
                            {product.product_material || "Sem material"}
                            </Typography>
                        </div>
                        <div className="flex items-center gap-2">
                            <Typography color="blue-gray">
                            {product.product_brand_name || "Sem marca"}
                            </Typography>
                        </div>
                        <div className="flex items-center gap-2">
                            <Typography color="blue-gray">{product.ean || "Sem EAN"}</Typography>
                        </div>
                        <div className="flex items-center gap-2">
                            <Typography color="blue-gray">{product.color_name || "Cor não cadastrada"}</Typography>
                        </div>

                        <div>
                            <div className="flex items-center gap-10">
                            <Button variant="h5" color="red" className="mb-2 cursor-pointer" onClick={() => handleRemoveFromCart(product.key_products_view)}>
                               -
                            </Button>
                            <Typography variant="h5" color="blue-gray" className="mb-2">
                               {cartItems.find(item => item.key_products_view === product.key_products_view)?.quantity || 0}
                            </Typography>
                            <Button variant="h5" color="blue" className="mb-2 cursor-pointer" onClick={() => 
                                handleAddToCart(product)}>
                               +
                            </Button>
                            </div>
                        </div>
                        
                        <div className="flex items-center gap-2">
                            <Typography color="blue-gray">{product.product_quantity_in_stock || "Estoque 0"}</Typography>
                        </div>
                            <Button
                            variant="outlined"
                            color="blue"
                            className="mt-2"
                            onClick={(e) => handleAddToCart([product.id,product.key_products_view, product.product_name, product.product_photo_url])}
                            >
                            Adicionar ao carrinho
                            </Button>
                        </div>
                    </CardBody>
                </Card>
            ))}
        </div>
    </div>
  );
  
}

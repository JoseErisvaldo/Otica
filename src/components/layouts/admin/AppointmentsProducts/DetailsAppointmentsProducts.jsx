import React, { useEffect, useState } from "react";
import { Avatar, Button, Card, CardBody, Typography } from "@material-tailwind/react";
import { EnvelopeIcon, PhoneIcon, MapPinIcon, MinusIcon, PlusIcon } from "@heroicons/react/24/solid";
import supabaseRequest from "../../../../services/api/supabaseRequest";
import DefaultSkeleton from "../DefaultSkeleton";

export default function DetailsAppointmentsProducts({ id }) {
  const [isLoading, setIsLoading] = useState(true);
  const [appointmentProduct, setAppointmentProduct] = useState(null);
  const [products, setProducts] = useState([]);
  const [cartItems, setCartItems] = useState(() => {
    const storedCart = localStorage.getItem("cartItems");
    return storedCart ? JSON.parse(storedCart) : [];
  });
  const [purchase_price, setPurchasePrice] = useState({});

  useEffect(() => {
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
    if(cartItems.length > 0){
      const id_suppliers = cartItems[0].suppliers_id;
    }
  }, [cartItems]);

  const fetchSupplierStock = async (supplierId) => {
    try {
      const appointmentProductData = await supabaseRequest({
        table: "view_products_details",
        method: "GET",
        filters: { id_suppliers: `eq.${supplierId}` },
      });
      setProducts(appointmentProductData);
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
        await fetchSupplierStock(product.suppliers_id);
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

  const handlePurchasePriceChange = (key, value) => {
    setPurchasePrice((prevState) => ({
      ...prevState,
      [key]: value,
    }));
  };

  const handleAddToCart = (product) => {
    if(cartItems.length > 0){
      const id_suppliers = cartItems[0].suppliers_id;
      if(id_suppliers !== product.id_suppliers){
        alert(`Agendamento com produtos de outro fornecedor (${cartItems.id_suppliers}) nao pode ser adicionado.`);
        return;
      }
    }
    if (!purchase_price[product.key_products_view]) {
      alert("Por favor, selecione o preço de compra para o produto.");
      return;
    }

    const price = purchase_price[product.key_products_view] || 0;
    const productToAdd = {
      appointments_id: Number(id),
      product_id: product.id,
      ean: product.ean,
      id_color_name: product.id_color_name,
      color_name: product.color_name,
      product_material: product.product_material,
      id_brand: product.id_brand,
      product_brand_name: product.product_brand_name,
      key_products_view: product.key_products_view,
      product_name: product.product_name,
      product_photo_url: product.product_photo_url,
      quantity: 1,
      purchase_price: price,
      suppliers_id: product.id_suppliers,
    };

    setCartItems((prevItems) => {
      const existingProduct = prevItems.find(
        (item) => item.key_products_view === product.key_products_view && item.purchase_price === price
      );

      if (existingProduct) {
        return prevItems.map((item) =>
          item.key_products_view === product.key_products_view
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }

      return [...prevItems, productToAdd];
    });
  };

  const handleRemoveFromCart = (productKey) => {
    setCartItems((prevItems) =>
      prevItems
        .map((item) =>
          item.key_products_view === productKey &&
          item.purchase_price === purchase_price[productKey]
            ? { ...item, quantity: item.quantity - 1 }
            : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  if (isLoading) {
    return <DefaultSkeleton />;
  }

  if (!appointmentProduct) {
    return <Typography color="red">Agendamento não encontrado!</Typography>;
  }

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
      <br />
      <div className="w-full flex flex-row items-center justify-center flex-wrap">
        {products &&
          products.map((product) => (
            <Card
              key={product.key_products_view}
              className="border border-gray-200 m-5 p-2"
            >
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
                  {product.product_name || "Produto não informado"}
                </Typography>
                <Typography color="blue-gray" className="mb-2">
                  Genêro: {product.gender || 'Genêro nao informado'}
                </Typography>
                <Typography color="blue-gray" className="mb-2">
                  Cor: {product.color_name || 'Cor não informada'}
                </Typography>
                <Typography color="blue-gray" className="mb-2">
                  Classificação: {product.classification || 'Classificação não informada'}
                </Typography>
                
                
                <div className="flex flex-col items-center gap-4 mt-6">
                  <div>
                    <input
                      type="number"
                      name="price"
                      value={purchase_price[product.key_products_view] || ""}
                      placeholder="Valor da compra"
                      onChange={(e) =>
                        handlePurchasePriceChange(
                          product.key_products_view,
                          parseFloat(e.target.value) || 0
                        )
                      }
                    />
                  </div>
                  <div className="flex items-center gap-10">
                    <Button
                      variant="h5"
                      color="red"
                      className="mb-2 cursor-pointer"
                      onClick={() => handleRemoveFromCart(product.key_products_view)}
                    >
                      <MinusIcon class="h-4 w-4 text-white" />   
                      
                    </Button>
                    <Button
                      variant="h5"
                      color="blue"
                      className="mb-2 cursor-pointer"
                      onClick={() => handleAddToCart(product)}
                    >
                      <PlusIcon class="h-4 w-4 text-white" />
                    </Button>
                  </div>
                  <Typography variant="h5" color="blue-gray" className="mb-2 flex flex-col items-center">
                    <div className="flex gap-2">
                      <span>Quantidade:</span>
                      <span>
                        {
                          cartItems.find(
                            (item) =>
                              item.key_products_view === product.key_products_view &&
                              item.purchase_price === purchase_price[product.key_products_view]
                          )?.quantity || 0
                        }
                      </span>
                    </div>
                    <div className="flex gap-2">
                      <span>Valor total:</span>
                      <span>
                        R$
                        {(
                          (cartItems.find(
                            (item) =>
                              item.key_products_view === product.key_products_view &&
                              item.purchase_price === purchase_price[product.key_products_view]
                          )?.quantity || 0) *
                          (purchase_price[product.key_products_view] || 0)
                        ).toFixed(2)}
                      </span>
                    </div>
                  </Typography>
                  <div className="flex items-center gap-2">
                    <Typography color="blue-gray">
                      {product.product_quantity_in_stock || "Estoque atual 0"}
                    </Typography>
                  </div>
                </div>
              </CardBody>
            </Card>
          ))}
      </div>
    </div>
  );
}

import React, { useEffect, useState } from "react";
import { Card, CardBody, Typography } from "@material-tailwind/react";
import supabaseRequest from "../../../../services/api/supabaseRequest";

export function MinimumStock() {
  const [products, setProducts] = useState([]);

  const fetchProducts = async () => {
    try {
      const data = await supabaseRequest({
        table: "view_minimum_stock",
        method: "GET",
      });
      setProducts(data);
      console.log(data);
    } catch (error) {
      console.error("Erro ao buscar produtos:", error);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div className="flex flex-wrap justify-center gap-4">
      <h1 className=" w-full text-2xl font-bold mb-4 text-start">
        Produtos com estoque abaixo do mínimo
      </h1>
      <div className="flex flex-wrap justify-center gap-4">
        {products &&
          products.map((product) => {
            const stockPercentage = (
              (product.product_quantity_in_stock / product.minimum_stock) *
              100
            ).toFixed(2);

            return (
            <Card
              key={product.product_id + product.id_color_name}
              className="w-full max-w-xs shadow-lg rounded-lg overflow-hidden"
            >
              <img
                src={product.product_photo_url}
                alt={product.product_name}
                className="w-full h-56 object-cover"
              />
              <CardBody>
                <Typography
                  variant="h6"
                  color="blue-gray"
                  className="text-center mb-2"
                >
                  {product.product_name}
                </Typography>
                <Typography color="gray" className="mb-4">
                  {product.product_brand_name} - {product.color_name}
                </Typography>
                <Typography variant="h6" color="green" className="font-semibold">
                  R${product.product_price}
                </Typography>
                <Typography className="text-sm mt-2 mb-4">
                  <span
                    className={`px-2 py-1 text-xs rounded-full ${
                      product.status_minimum_stock === "Estoque abaixo"
                        ? "bg-red-500 text-white"
                        : product.status_minimum_stock === "Estoque acima"
                        ? "bg-green-500 text-white"
                        : "bg-yellow-500 text-black"
                    }`}
                  >
                    {product.status_minimum_stock}
                  </span>
                </Typography>

                {/* Barra de progresso de estoque */}
                <div className="-4">
                    <Typography className="text-sm">
                    Estoque atual: {product.product_quantity_in_stock}
                  </Typography>
                  <Typography className="text-sm">
                    Estoque mínimo: {product.minimum_stock}
                  </Typography>
                  <div className="w-full bg-gray-200 rounded-full h-2.5 mt-2">
                    <div
                      className={`h-2.5 rounded-full ${
                        stockPercentage < 50 ? "bg-red-500" : "bg-green-500"
                      }`}
                      style={{ width: `${stockPercentage}%` }}
                    ></div>
                  </div>
                  <Typography className="text-xs text-center mt-1">
                    {stockPercentage}% do estoque mínimo
                  </Typography>
                </div>

                <Typography className="text-sm text-gray-500 mt-4">
                  {product.registration_status}
                </Typography>
              </CardBody>
            </Card>
          );
            })
        }
        </div>
    </div>
  );
}

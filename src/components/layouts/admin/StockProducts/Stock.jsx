import React, { useEffect, useState } from "react";
import { Button, Card, CardBody, CardFooter, Typography } from "@material-tailwind/react";
import supabaseRequest from "../../../../services/api/supabaseRequest";
import { ArrowTrendingDownIcon, ArrowTrendingUpIcon, MinusIcon } from "@heroicons/react/24/solid";
import PieChartQtdStock from "../dashboard/StockProducts/PieChartQtdStock";
import CardStockTotal from "../../../UI/admin/CardStockTotal";
import ProductCard from "./ProductCard ";

export function Stock() {
  const [products, setProducts] = useState([]);

  const fetchProducts = async () => {
    try {
      const data = await supabaseRequest({
        table: "view_minimum_stock",
        method: "GET",
      });
      setProducts(data);
    } catch (error) {
      console.error("Erro ao buscar produtos:", error);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const viewStockMinimum = products.length > 0 && products.filter(
    (product) => product.status_minimum_stock === "Estoque abaixo"
  ).length;

  const viewStockMaximum = products.length > 0 && products.filter(
    (product) => product.status_minimum_stock === "Estoque acima"
  ).length;

  const viewStockLimit = products.length > 0 && products.filter(
    (product) => product.status_minimum_stock === "Estoque no limite"
  ).length;

  return (
    <div className="flex flex-wrap justify-center gap-4">
      <h1 className="w-full text-2xl font-bold mb-4 text-start">Estoque de produtos</h1>
      
      {/* Exibindo os Cards de total de estoque */}
      <div className="flex flex-wrap justify-center gap-4">
        <CardStockTotal title="Estoque abaixo do mínimo" total={viewStockMinimum} icon={<ArrowTrendingDownIcon className="h-10 w-10 text-red-500" />} />
        <CardStockTotal title="Estoque no limite" total={viewStockLimit} icon={<MinusIcon className="h-10 w-10 text-gray-500" />} />
        <CardStockTotal title="Estoque acima do mínimo" total={viewStockMaximum} icon={<ArrowTrendingUpIcon className="h-10 w-10 text-green-500" />} />
      </div>

      {/* Gráfico de pizza */}


      {/* Exibindo os cards dos produtos */}
      <div className="flex flex-wrap justify-center gap-4 mt-8">
        {products.map((product) => (
          <ProductCard key={product.product_id + product.id_color_name} product={product} />
        ))}
      </div>
    </div>
  );
}

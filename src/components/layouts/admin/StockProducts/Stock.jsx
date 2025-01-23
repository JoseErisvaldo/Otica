import React, { useEffect, useState } from "react";
import { Button, Card, CardBody, CardFooter, Typography } from "@material-tailwind/react";
import supabaseRequest from "../../../../services/api/supabaseRequest";
import { ArrowTrendingDownIcon, ArrowTrendingUpIcon, MinusIcon } from "@heroicons/react/24/solid";
import PieChartQtdStock from "../dashboard/StockProducts/PieChartQtdStock";
import CardStockTotal from "../../../UI/admin/CardStockTotal";
import ProductCard from "./ProductCard ";
import { Pagination } from "../../../UI/admin/Pagination";

export function Stock() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState();

  const fetchProducts = async (pageNumber) => {
    try {
      setLoading(false);
      const limit = 10
      const offset = pageNumber * limit;
      const data = await supabaseRequest({
        table: "view_minimum_stock",
        method: "GET",
        limit,
        offset
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

  const loadNextPage = () => {
    console.log("load next page");
    if (!loading) {
      setCurrentPage((prevPage) => prevPage + 1);
      fetchProducts(currentPage + 1); 
    }
  };

  const loadPreviousPage = () => {
    if (!loading) {
      setCurrentPage((prevPage) => prevPage - 1);
      fetchProducts(currentPage - 1);
    }
  };

  return (
    <div className="flex flex-wrap flex-col  justify-center gap-4">
      <h1 className="w-full text-2xl font-bold mb-4 text-start">Estoque de produtos</h1>
      {/* Cards de total de estoque 
      <div className="flex flex-wrap justify-center gap-4">
        <CardStockTotal title="Estoque abaixo do mínimo" total={viewStockMinimum} icon={<ArrowTrendingDownIcon className="h-10 w-10 text-red-500" />} />
        <CardStockTotal title="Estoque no limite" total={viewStockLimit} icon={<MinusIcon className="h-10 w-10 text-gray-500" />} />
        <CardStockTotal title="Estoque acima do mínimo" total={viewStockMaximum} icon={<ArrowTrendingUpIcon className="h-10 w-10 text-green-500" />} />
      </div>
      */}
      <div className="flex flex-wrap justify-center gap-4 mt-8">
        {products.map((product) => (
          <ProductCard key={product.product_id + product.id_color_name} product={product} />
        ))}
      </div>
      <div className="mt-3 p-5">
        <Pagination
          currentPage={currentPage}
              totalPages={totalPages}
              onNextPage={loadNextPage}
          onPrevPage={loadPreviousPage}
        />
      </div>
    </div>
  );
}

import { useEffect, useState } from "react";
import { Button, Card, CardBody, Typography, Avatar } from "@material-tailwind/react";
import supabaseRequest from "../../../../services/api/supabaseRequest";
import { EyeIcon, PencilSquareIcon } from "@heroicons/react/24/outline";
import { Link } from "react-router-dom";

export default function ViewProducts() {
  const [products, setProducts] = useState([]);
  console.log(products);
  const [isLoading, setIsLoading] = useState(true);

  const fetchProducts = async () => {
    try {
      // Fetch data from the new view (view_products_details)
      const productsData = await supabaseRequest({
        table: "view_products_details",
        method: "GET",
      });
      console.log(productsData);
      setProducts(productsData);
    } catch (error) {
      console.error("Erro ao buscar produtos:", error.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <Card>
      <CardBody>
        <div className="mb-6">
          <Typography variant="h4" color="blue-gray" className="text-center">
            Estoque de Produtos
          </Typography>
        </div>
        {isLoading ? (
          <Typography className="text-center">Carregando...</Typography>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {products.map(
              ({
                key_products_view,
                product_id,
                product_name,
                classification,
                gender,
                product_price,
                product_discount_percentage,
                discounted_price,
                product_quantity_in_stock,
                product_material,
                product_photo_url,
                supplier_name,
                product_brand_name,
                color_name,
                ean,
                registration_status,
                name_status_product
              }) => (
                <div
                  key={key_products_view}
                  className="border rounded-lg p-4 flex flex-col items-center shadow-md hover:shadow-lg transition-shadow"
                >
                  {/* Exibe a foto do produto */}
                  <Typography color="blue-gray" className="w-full mb-1 flex justify-end ">
                    <span className={name_status_product === 'Pendente' ? 'bg-red-600 font-bold text-white px-2 py-1 rounded' : 'bg-green-600 font-bold text-white p-1 rounded'}> {name_status_product || ""}</span>
                  </Typography>
                    <Avatar
                      src={product_photo_url}
                      alt={product_name}
                      size="xl"
                      variant="rounded"
                      className="mb-4"
                    />
                  
                  <Typography
                    color="blue-gray"
                    variant="h6"
                    className="text-center mb-2"
                  >
                    {product_name}
                  </Typography>
                  <Typography color="blue-gray" className="mb-1">
                    <span className="font-bold">EAN:</span> {ean || ""}
                  </Typography>
                  <Typography color="blue-gray" className="mb-1">
                    <span className="font-bold">Classificação:</span> {classification || ""}
                  </Typography>
                  <Typography color="blue-gray" className="mb-1">
                    <span className="font-bold">Gênero:</span> {gender || ""}
                  </Typography>
                  <Typography color="blue-gray" className="mb-1">
                    <span className="font-bold">Preço:</span> <span className="">R$ {product_price.toFixed(2)}</span>
                  </Typography>
                  <Typography color="blue-gray" className="mb-1">
                    <span className="font-bold">Desconto:</span> {product_discount_percentage}% 
                  </Typography>
                  <Typography color="blue-gray" className="mb-1">
                    <span className="font-bold">Valor com desconto:</span> {discounted_price}
                  </Typography>
                  <Typography color="blue-gray" className="mb-1">
                    <span className="font-bold">Cor:</span> {color_name || ""}
                  </Typography>
                  <Typography color="blue-gray" className="mb-1">
                    <span className="font-bold">Material:</span> {product_material || ""}
                  </Typography>
                  <Typography color="blue-gray" className="mb-1">
                    <span className="font-bold">Marca:</span> {product_brand_name || ""}
                  </Typography>
                  <Typography color="blue-gray" className="mb-1">
                    <span className="font-bold">Quantidade em Estoque:</span> {product_quantity_in_stock}
                  </Typography>
                  <Typography color="blue-gray" className="mb-1">
                    <span className="font-bold">Fornecedor:</span> {supplier_name || ""}
                  </Typography>
                  <Typography color="blue-gray" className="mb-1">
                  <span className={registration_status === 'Cadastro pendente' ? 'text-red-600 font-bold' : 'text-green-600 font-bold'}> {registration_status || ""}</span>
                  </Typography>
              
                  
                  <div className="flex flex-row justify-between gap-2 w-full justify-center">
                  <Link to={`/admin/editproduct/${key_products_view}`}>
                      <Button color="blue" className="flex items-center gap-2">
                        <PencilSquareIcon className="h-3 w-3 text-white" />
                        Editar
                      </Button>
                    </Link>
                  {registration_status !== 'Cadastro pendente' && (
                    <Link to={`/admin/productsdetails/${key_products_view}`}>
                      <Button color="green" className="flex items-center gap-2">
                        <EyeIcon className="h-3 w-3 text-white" />
                        Comprar
                      </Button>
                    </Link>
                    )}
                    
                  </div>
                </div>
              )
            )}
          </div>
        )}
      </CardBody>
    </Card>
  );
}

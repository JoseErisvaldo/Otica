import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Input, Button, Card, CardBody, Typography } from "@material-tailwind/react";
import supabaseRequest from "../../../../services/api/supabaseRequest";
import supabase from "../../../../services/supabase";


export default function ProductsEdit() {
  const { id } = useParams(); // Pega o ID do produto da URL
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    id: "",
    product_name: "",
    product_brand_name: "",
    product_material: "",
    photo: "",
    ean: "",
    classification: "",
    gender: "", // Inicializa o campo de gênero como vazio
  });
  console.log(formData);
  const [genders, setGenders] = useState([]); // Estado para armazenar os gêneros disponíveis
  const [isLoading, setIsLoading] = useState(false);
  const [productsGenderClassificationrData, setProductsGenderClassificationrData] = useState([]); // Classificação de gêneros
  const [productsBrandData, setProductsBrandData] = useState([]); // Dados das marcas
  // Busca os dados do produto pelo ID
  const fetchProduct = async () => {
    setIsLoading(true);
    try {
      const productData = await supabaseRequest({
        table: "view_products_details",
        method: "GET",
        filters: { key_products_view: `eq.${id}` },
      });
  
      if (productData && productData.length > 0) {
        setFormData({
          ...formData,
          ...productData[0],
          gender: productData[0].gender_id || "", // Garante ID ou vazio
          classification: productData[0].classification_id || "", // Garante ID ou vazio
          product_brand_name: productData[0].product_brand || "",
        });
      }
  
      const genderData = await supabaseRequest({
        table: "products_gender",
        method: "GET",
      });
      setGenders(genderData);
  
      const genderClassificationData = await supabaseRequest({
        table: "products_gender_classification",
        method: "GET",
      });
      setProductsGenderClassificationrData(genderClassificationData);
      const productsBrandData = await supabaseRequest({
        table: "products_brand",
        method: "GET",
      });
      setProductsBrandData(productsBrandData);
    } catch (error) {
      console.error("Erro ao buscar produto ou gêneros:", error.message);
    } finally {
      setIsLoading(false);
    }
  };
  
  useEffect(() => {
    fetchProduct();
  }, [id]);

  // Atualiza o estado conforme o usuário edita os campos
 const handleInputChange = (e) => {
  const { name, value } = e.target;

  setFormData((prevData) => ({
    ...prevData,
    [name]: value, // Salva diretamente o valor selecionado (ID no caso de selects)
  }));
};

  // Salva as alterações no Supabase
  const saveProduct = async () => {
    try {
      setIsLoading(true);
  
      const preparedData = {
        name: formData.product_name,
        brand: formData.product_brand_name,  // Se você estiver usando o id da marca
        material: formData.product_material,
        ean: formData.ean,
        classification: formData.classification ? parseInt(formData.classification) : null,
        gender: formData.gender ? parseInt(formData.gender) : null,
      };
  
      // Atualizando o produto utilizando o id da tabela 'products'
      const { data, error } = await supabase
        .from('products')
        .update(preparedData)
        .eq('id', formData.id)  // A coluna 'id' da tabela 'products'
        .select();
  
      if (error) {
        throw new Error(error.message);
      }
  
      alert("Produto atualizado com sucesso!");

    } catch (error) {
      console.error("Erro ao salvar produto:", error.message);
    } finally {
      setIsLoading(false);
    }
  };
  

  return (
    <Card>
      <CardBody>
        <Typography variant="h4" color="blue-gray" className="mb-6 text-center">
          Editar Produto
        </Typography>
        {isLoading ? (
          <Typography className="text-center">Carregando...</Typography>
        ) : (
          <form>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="col-span-2">
                <Input
                  label="Nome do Produto"
                  name="product_name"
                  value={formData.product_name}
                  onChange={handleInputChange}
                />
              </div>
              <div className="col-span-2">
                <Input
                  label="EAN"
                  name="ean"
                  value={formData.ean}
                  onChange={handleInputChange}
                />
              </div>
              <div className="col-span-2">
                <select
                name="product_brand_name"
                value={formData.product_brand_name}
                onChange={handleInputChange}
                className="w-full border p-2 rounded"
                >
                <option value="">Selecione uma product_brand_name</option>
                {productsBrandData.map((product_brand_name) => (
                    <option key={product_brand_name.id} value={product_brand_name.id}> {/* Use o ID aqui */}
                    {product_brand_name.brand} {/* Mostra o nome no dropdown */}
                    </option>
                ))}
                </select>

              </div>
              <div className="col-span-2">
              <select
                name="classification"
                value={formData.classification}
                onChange={handleInputChange}
                className="w-full border p-2 rounded"
                >
                <option value="">Selecione uma classificação</option>
                {productsGenderClassificationrData.map((classification) => (
                    <option key={classification.id} value={classification.id}> {/* Use o ID aqui */}
                    {classification.classification} {/* Mostra o nome no dropdown */}
                    </option>
                ))}
                </select>

              </div>
              <div className="col-span-2">
                <select
                  name="gender"
                  value={formData.gender} // O ID do gênero será exibido
                  onChange={handleInputChange}
                  className="w-full border p-2 rounded"
                >
                  <option value="">Selecione um gênero</option>
                  {genders.map((gender) => (
                    <option key={gender.id} value={gender.id}>
                      {gender.gender}
                    </option>
                  ))}
                </select>
              </div>
              <div className="col-span-2">
                <Input
                  label="Material"
                  name="product_material"
                  value={formData.product_material}
                  onChange={handleInputChange}
                />
              </div>
            </div>
            <div className="flex justify-end mt-6">
              <Button color="red" onClick={() => navigate("/admin/products")} className="mr-4">
                Cancelar
              </Button>
              <Button color="green" onClick={saveProduct}>
                Salvar Alterações
              </Button>
            </div>
          </form>
        )}
      </CardBody>
    </Card>
  );
}

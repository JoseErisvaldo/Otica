import { useEffect, useState } from "react";
import { Avatar, Button, Card, CardBody, Dialog, DialogBody, DialogFooter, DialogHeader, Typography } from "@material-tailwind/react";
import FormatPrice from "../../../../utils/FormatPrice";
import { MagnifyingGlassIcon } from "@heroicons/react/24/solid";
import supabase from "../../../../services/supabase";

export default function ViewCheckoutProducts() {
  const [orderProducts, setOrderProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [howManyTimes, setHowManyTimes] = useState(1);  
  const [searchTerm, setSearchTerm] = useState('');
  const [clients, setClients] = useState([]);
  const [formData, setFormData] = useState({
    id_client: "",    
  });
  const [entryValue, setEntryValue] = useState(false);
  const [inputValue, setInputValue] = useState(0);
  useEffect(() => {
    const localStorageData = localStorage.getItem("OrderProducts");
    if (localStorageData) {
      const parsedData = JSON.parse(localStorageData);
      setOrderProducts(parsedData); 
      setIsLoading(false);
    }
  }, []);

  const handleHowManyTimes = (value) => {
    setHowManyTimes(1)
    setHowManyTimes(value);
  }
  useEffect(() => {
    if(entryValue === false){
      setInputValue(0);
    }
  }, [entryValue]);
  const priceProducts = orderProducts.map((item) => {
    return item.quantity * item.product_price;
  }).reduce((a, b) => a + b, 0) -inputValue

  const priceProductsDiscounted = orderProducts.map((item) => {
    return item.quantity * item.discounted_price;
  }).reduce((a, b) => a + b, 0) -inputValue

  const handleInputValue = (e) => {
    
    if(e < priceProducts){
      console.log("O valor informado é menor que o total da compra")
      setInputValue(e);
    } else {
      console.log("O valor informado é maior que o total da compra") 
      setInputValue(0);
      setEntryValue(false)
    }
  }

  const handleClientSearch = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const { data, error } = await supabase.rpc("search_users", {
        search_term: searchTerm,
      });
  
      if (error) throw error;
  
      setClients(data || []);
    } catch (error) {
      console.error("Erro ao buscar clientes:", error.message);
      setClients([]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleClientSelect = (id) => {
    setFormData((prev) => ({
      ...prev,
      id_client: id
    }));
    setSearchTerm('')
  };
  
  const handleSubmit = async (e) => {
    console.log('oi')
    e.preventDefault();

    if(entryValue === true && inputValue === 0){
      alert('Desconto inválido!');
      console.log(inputValue, entryValue);
      return;
    }
    
    if (!orderProducts.length) {
      alert('Nenhum produto no pedido!');
      return;
    }
    if (!formData.id_client) {
      alert('Selecione um cliente!');
      return;
    }

   
    try {
      const { data: orderData, error } = await supabase
        .from('order_products')
        .insert({ id_user: formData.id_client, howManyTimes, inputValue: inputValue })
        .select(); // This will explicitly ask Supabase to return the inserted rows
  
      // Log the orderData to check
      console.log(orderData); 
      
      if (error) {
        throw error;
      }
  
      if (!orderData || !orderData[0] || !orderData[0].id) {
        throw new Error('Erro ao criar o pedido: ID do pedido não foi retornado');
      }
  
      const orderId = orderData[0].id;
  
      const dataOrderDetails = orderProducts.map((item) => ({
        classification: item.classification,
        color_name: item.color_name, 
        discounted_price: item.discounted_price, 
        ean: item.ean,
        id_color_name: item.id_color_name, 
        id_suppliers: item.id_suppliers,
        product_brand: item.product_brand, 
        product_discount_percentage: item.product_discount_percentage,
        product_id: item.product_id,
        product_material: item.product_material,
        product_photo_url: item.product_photo_url, 
        product_price: item.product_price, 
        product_quantity_in_stock: item.product_quantity_in_stock,
        quantity: item.quantity,
        order_id: orderId
      }));
  
      const { error: detailsError } = await supabase
        .from('order_products_details')
        .insert(dataOrderDetails);
      console.log(detailsError);
      if (detailsError) throw detailsError;
  
      alert('Pedido salvo com sucesso!');
    } catch (err) {
      console.error('Erro ao salvar o pedido:', err.message);
    }
  };
  
  
  return (
    <Card>
        <div className="w-full flex items-center justify-center p-5">
          <div className="w-96 flex flex-col gap-2 justify-center">
            <Typography variant="small" color="gray">Cliente:</Typography>
              <div className="flex items-center gap-2">
                <input
                  onChange={(e) => handleSearchChange(e.target.value)}
                  type="text"
                  placeholder="Pesquisar cliente"
                  className="w-full bg-white border border-gray-300 rounded-md p-2"
                />
                <button onClick={handleClientSearch}>
                  <MagnifyingGlassIcon className="h-11 w-11 text-white bg-blue-600 cursor-pointer hover:bg-blue-700 p-2 rounded" />
                </button>
            </div>
            <select
              name="id_client"
              value={formData.id_client}
              onChange={(e) => handleClientSelect(e.target.value)}
              required
              className="w-full bg-white border border-gray-300 rounded-md p-2"
            >
              <option value="">Selecione um cliente</option>
              {clients.map((client) => (
              <option key={client.id} value={client.id}>
                {client.name} - {client.whatsapp}
              </option>
            ))}
            </select>
          </div>
        </div>
        <CardBody>
        <div className="mb-4 flex items-center justify-between">
        </div>
        <div className="divide-y divide-gray-200">
          {isLoading ? (
            <Typography>Carregando...</Typography>
          ) : (
            orderProducts.map(
              ({
                id,
                product_photo_url,
                product_name,
                color_name,
                quantity,
                product_price,
                discounted_price,
                product_discount_percentage,
                ean
              }) => (
                <div
                  key={id}
                  className=" flex flex-col justify-center items-center gap-3 sm:grid sm:grid-cols-2  pb-3 pt-3 last:pb-0"
                >
                  <div className=" flex flex-col sm:flex-row items-center gap-x-3">
                    <div>
                      <Avatar
                      src={product_photo_url}
                      alt={product_name}
                      className="w-16 h-16"
                      />
                    </div>
                   <div>
                    <div className="flex flex-row justify-start items-start gap-1 font-bold">
                      {product_name}- 
                      {color_name},
                      {ean}
                    </div>
                    <Typography color="blue-gray" className="flex flex-row justify-start items-start gap-1">
                      <span className="font-bold">Quantidade:</span> {quantity}x,
                    </Typography>
                    <Typography color="blue-gray" className="flex flex-row justify-start items-start gap-1">
                      <span className="font-bold">Valor sem desconto:</span> R$ {product_price.toFixed(2)} 
                    </Typography>
                    <Typography color="blue-gray" className="flex flex-row justify-start items-start gap-1">
                      <span className="font-bold">Valor com desconto:</span> {product_discount_percentage === 0 ? "Sem desconto" : discounted_price.toFixed(2)} 
                    </Typography>
                    </div>
                  </div>  
                  <div className="flex justify-end gap-3">
                    <select>
                      <option value="0 ">Selecione o tipo de lente</option>
                      <option value="1">Teste 1</option>
                      <option value="2">Teste 2</option>
                      <option value="3">Teste 3</option>
                    </select>
                  </div>
                </div>
              )
            )
          )}
          <div>
            <div>
              <span className="font-bold text-1xl p-5 flex justify-between items-center flex-wrap border-2 rounded mt-5 mb-5">
                Valor de entrada ? <input className="w-4 h-4" type="checkbox" onChange={(e) => setEntryValue(e.target.checked)} /> 
              </span>
              {entryValue && (
                <div className="border-2 rounded mt-5 mb-5">
                  <input type="number" placeholder="Valor de entrada" onChange={(e) => handleInputValue(e.target.value)} />
                </div>
              )}
            </div>
          
          <select name="howManyTimes" id="" onChange={(e) => handleHowManyTimes(e.target.value)}>
              <option value={1} >1x de {FormatPrice({value: priceProductsDiscounted.toFixed(2)})} - {priceProductsDiscounted.toFixed(2)}</option>
              <option value={2} >2x de {FormatPrice({value: (priceProducts / 2).toFixed(2)})} - sem juros</option>
              <option value={3} >3x de {FormatPrice({value: (priceProducts / 3).toFixed(2)})}  - sem juros</option>
              <option value={4} >4x de {FormatPrice({value: (priceProducts / 4).toFixed(2)})} - sem juros</option>
              <option value={5} >5x de {FormatPrice({value: (priceProducts / 5).toFixed(2)})} - sem juros</option>
              <option value={6} >6x de {FormatPrice({value: (priceProducts / 6).toFixed(2)})} - sem juros</option>
              <option value={7} >7x de {FormatPrice({value: (priceProducts / 7).toFixed(2)})} - sem juros</option>
              <option value={8} >8x de {FormatPrice({value: (priceProducts / 8).toFixed(2)})} - sem juros</option>
              <option value={9} >9x de {FormatPrice({value: (priceProducts / 9).toFixed(2)})} - sem juros</option>
              <option value={10} >10x de {FormatPrice({value: (priceProducts / 10).toFixed(2)})} - sem juros</option>
              <option value={11}>11x de {FormatPrice({value: (priceProducts / 11).toFixed(2)})} - sem juros</option>
              <option value={12}>12x de {FormatPrice({value: (priceProducts / 12).toFixed(2)})} - sem juros</option>
            </select>
          </div>
          <div className="font-bold text-1xl p-5 flex justify-between items-center flex-wrap border-blue-gray-500 border-2 rounded mt-5 mb-5">
            <span className="flex flex-col justify-start items-start">
              <span>Total de produtos: {orderProducts.length} </span>
              <span>Total de peças: {orderProducts.map((item) => item.quantity).reduce((a, b) => a + b, 0)} </span> 
            </span>
            {howManyTimes != 1 ? 
               <span className="">
               Valor: {FormatPrice({value: priceProducts.toFixed(2)})} / {howManyTimes}x {FormatPrice({value: (priceProducts / howManyTimes).toFixed(2)})} 
              </span>
              : 
              <span className="">
               Valor: {FormatPrice({value: priceProductsDiscounted.toFixed(2)})} / {howManyTimes}x {FormatPrice({value: (priceProductsDiscounted / howManyTimes).toFixed(2)})} 
             </span>
            }
          </div>
        
        </div>
      </CardBody> 
      <>
        <Button onClick={handleSubmit} variant="gradient" color="green">
          Finalizar compra
        </Button>
      </>
    </Card>
  );
}
